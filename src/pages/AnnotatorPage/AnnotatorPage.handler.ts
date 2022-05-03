// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import {
  createAnnotations,
  createImageNetAnnotation,
  getClasses,
  getImageNetHit,
  getImages,
  insertPage,
} from "@api";
import { useBeforeUnload } from "@hooks";
import { Image } from "@models";
import { AnnotationsState, AppState, ImageNetState, UserState } from "@stores";
import {
  capitalize,
  generateSurveyCode,
  generateUUID,
  replaceImageNetImagesWithoutError,
} from "@utils";
import { useCallback, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chooseOneOfClasses,
  chooseSomeOfImages,
  projectAnnotationsForImageNet,
  validateWorker,
} from "./AnnotatorPage.utils";

const useHandler = () => {
  const user = useRecoilValue(UserState);
  const [app, setApp] = useRecoilState(AppState);
  const annotations = useRecoilValue(AnnotationsState);
  const [imageNetState, setImageNetState] = useRecoilState(ImageNetState);
  const [state, setState] = useState({
    loading: true,
    submitting: false,
    error: null,
  });
  useBeforeUnload(true);

  const handleError = useCallback(
    async (errorImage: Image) => {
      setApp((prevState) => {
        const updatedImageNetImages = replaceImageNetImagesWithoutError(
          app.imageNetImages,
          app.currentImages,
          errorImage
        );
        return {
          ...prevState,
          imageNetImages: updatedImageNetImages,
        };
      });
    },
    [setApp]
  );

  const createHIT = app.isForImageNetHIT
    ? useCallback(async () => {
        if (
          typeof app.hitDatasetName === "undefined" ||
          typeof app.imageNetHitId === "undefined" ||
          typeof app.workerId === "undefined"
        ) {
          setApp((app) => ({
            ...app,
            error:
              "'hitDatasetName' or 'imageNetHitId' or 'workerId' is undefined",
          }));
          return;
        }

        try {
          setState((state) => ({ ...state, loading: true }));
          setApp((app) => ({ ...app, currentImages: [] }));
          const hit = await getImageNetHit(
            app.hitDatasetName,
            app.imageNetHitId
          );

          const {
            imageNetAnnotationId,
            initialSubmitCount,
            isDone,
            isSameAssignment,
          } = await validateWorker({
            imageNetHit: hit,
            app,
            imageNetAnnotationId: imageNetState.annotation.id,
          });
          if (isDone) {
            if (isSameAssignment) {
              setApp((app) => ({ ...app, surveyCode: generateSurveyCode() }));
            } else {
              setApp((app) => ({
                ...app,
                error:
                  "You have already completed one of our HITs. We do not accept more than 1 HIT per worker.",
              }));
            }
          } else {
            setApp((app) => ({
              ...app,
              submitCount: initialSubmitCount,
            }));
            setImageNetState((state) => ({
              ...state,
              hit: { ...hit },
              annotation: {
                ...state.annotation,
                id: imageNetAnnotationId,
              },
            }));
          }

          setImageNetState((imageNetState) => ({
            ...imageNetState,
            hit,
            annotation: {
              ...imageNetState.annotation,
            },
          }));
          setApp((app) => ({
            ...app,
            totalSubmitCount: hit.pages.length,
            imageNetClass: hit.pages[app.submitCount - 1].class,
            imageNetImages: hit.pages[app.submitCount - 1].images,
            currentImages: hit.pages[app.submitCount - 1].images,
            startedAt: new Date().getTime(),
          }));
        } catch (error: any) {
          setState((state) => ({
            ...state,
            error: error?.response?.data?.error ?? error.message,
          }));
        } finally {
          setState((state) => ({ ...state, loading: false }));
        }
      }, [app.hitDatasetName, app.imageNetHitId])
    : useCallback(async () => {
        setState((state) => ({ ...state, loading: true }));
        setApp((app) => ({ ...app, currentImages: [] }));

        // fetch classes and pick one
        const imageNetClasses = await getClasses();
        const imageNetClass = chooseOneOfClasses(imageNetClasses, app);

        setApp((app) => ({
          ...app,
          imageNetClass,
          blacklistClasses: [...app.blacklistClasses, imageNetClass.id],
        }));

        // fetch images and pick one
        const imageNetImages = await getImages(imageNetClass);
        const currentImages = chooseSomeOfImages(imageNetImages, app);

        setApp((app) => ({
          ...app,
          imageNetImages,
          currentImages,
        }));
        setState((state) => ({ ...state, loading: false }));
      }, [app.version, app.blacklistClasses]);

  const submitHandler = app.isForImageNetHIT
    ? useCallback(async () => {
        if (
          typeof app.hitDatasetName === "undefined" ||
          typeof app.imageNetHitId === "undefined"
        )
          throw new Error("HIT Dataset Name or HIT ID is undefined");
        if (state.loading || state.submitting) return;
        window.scrollTo(0, 0);
        setState((state) => ({ ...state, submitting: true }));
        try {
          const { isDone, isSameAssignment } = await validateWorker({
            app,
            imageNetHit: imageNetState.hit,
            imageNetAnnotationId: imageNetState.annotation.id,
          });
          if (isDone) {
            if (isSameAssignment) {
              setApp((app) => ({ ...app, surveyCode: generateSurveyCode() }));
            } else {
              setApp((app) => ({
                ...app,
                error:
                  "You have already completed one of our HITs. We do not accept more than 1 HIT per worker.",
              }));
            }
          }

          if (app.submitCount === 1) {
            await createImageNetAnnotation({
              hitDatasetName: app.hitDatasetName,
              imageNetHitID: app.imageNetHitId,
              annotation: imageNetState.annotation,
              startedAt: app.startedAt,
            });
          }
          await insertPage({
            hitDatasetName: app.hitDatasetName,
            imageNetAnnotationId: imageNetState.annotation.id,
            page: {
              id: generateUUID(),
              pageno: imageNetState.hit.pages[app.submitCount - 1].pageno,
              startedAt: app.pageStartedAt,
              annotations: projectAnnotationsForImageNet(annotations),
            },
            isDone: app.submitCount >= app.totalSubmitCount,
          });

          if (app.totalSubmitCount <= app.submitCount) {
            setState((state) => ({ ...state, submitting: false }));
            setApp((app) => ({
              ...app,
              surveyCode: generateSurveyCode(),
            }));
            return;
          }
          setApp((app) => ({
            ...app,
            submitCount: app.submitCount + 1,
            imageNetClass: imageNetState.hit.pages[app.submitCount].class,
            imageNetImages: imageNetState.hit.pages[app.submitCount].images,
            currentImages: imageNetState.hit.pages[app.submitCount].images,
            pageStartedAt: new Date().getTime(),
          }));
        } catch (error) {
          alert(error ?? "Unknown Error");
        } finally {
          setState((state) => ({ ...state, submitting: false }));
        }
      }, [state, app, imageNetState, annotations])
    : useCallback(async () => {
        if (state.loading || state.submitting) return;
        window.scrollTo(0, 0);
        setState((state) => ({ ...state, submitting: true }));
        try {
          await createAnnotations(annotations, {
            annotatorID: app.workerId ?? user.username,
            version: app.version,
            assignmentID: app.assignmentId,
            hitID: app.hitId,
            workerID: app.workerId,
          });
          if (app.totalSubmitCount <= app.submitCount) {
            setState((state) => ({ ...state, submitting: false }));
            setApp((app) => ({
              ...app,
              surveyCode: generateSurveyCode(),
            }));
            return;
          }
          await createHIT();
          setApp((prevApp) => ({
            ...prevApp,
            submitCount: prevApp.submitCount + 1,
          }));
        } catch (error) {
          alert(error ?? "Unknown Error");
        } finally {
          setState((state) => ({ ...state, submitting: false }));
        }
      }, [state, app, annotations]);

  const term = useMemo(
    () => app.imageNetClass.synset.map(capitalize).join(", "),
    [app.imageNetClass]
  );

  return {
    state,
    createHIT,
    handleError,
    submitHandler,
    term,
  };
};

export default useHandler;
