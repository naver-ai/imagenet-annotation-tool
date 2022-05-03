// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { searchImageNetAnnotation } from "@api";
import { IMAGE_NUMBER } from "@constants";
import { Class, Image, ImageNetHIT } from "@models";
import { AnnotationsStateType, AppStateType } from "@stores";
import { getRandomElement } from "@utils";

export const chooseOneOfClasses = (
  classes: Required<Class>[],
  app: AppStateType
): Required<Class> => {
  const { version } = app;
  let candidates = classes.filter(
    (each) => !app.blacklistClasses.includes(each.id)
  );

  // In development mode, Nudity class will be excluded ------------------------
  if (process.env.NODE_ENV === "development")
    candidates = candidates.filter((each) => !each.synset.includes("cock"));
  // ---------------------------------------------------------------------------

  const minAnnotationCount = Math.min(
    ...candidates.map((each) => each.annotationCount[version])
  );
  candidates = candidates.filter(
    (each) => each.annotationCount[version] === minAnnotationCount
  );
  return getRandomElement(candidates);
};

const shuffle = <T extends any>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const chooseSomeOfImages = (
  images: Required<Image>[],
  app: AppStateType
): Required<Image>[] => {
  const { version } = app;
  const candidates = shuffle(images).sort(
    (a, b) => a.annotationCount[version] - b.annotationCount[version]
  );
  return candidates.slice(0, IMAGE_NUMBER);
};

export const generateDefaultAnnotation = (image: Image) => ({
  id: image.id,
  estimateTime: 0,
  hoveredCount: 0,
  imageWidth: 0,
  imageHeight: 0,
  mousePoint: { x: 0, y: 0 },
  selectedCount: 0,
  selected: false,
  imagePosition: { x: 0, y: 0 },
  mouseTracking: [],
});

export const projectAnnotationsForImageNet = (
  annotations: AnnotationsStateType
) => {
  return annotations.map((annotation) => ({
    selected: annotation.selected,
    selectedCount: annotation.selectedCount,
    selectedRecord: annotation.selectedRecord,
    hoveredCount: annotation.hoveredCount,
    hoveredRecord: annotation.hoveredRecord,
    imagePosition: {
      x: annotation.imageX,
      y: annotation.imageY,
    },
    imageWidth: annotation.imageWidth,
    imageHeight: annotation.imageHeight,
    originalImageWidth: annotation.originalImageWidth,
    originalImageHeight: annotation.originalImageHeight,
    estimateTime: annotation.estimateTime,
    mouseTracking: annotation.mouseTracking.map((point) => ({
      x: point.x,
      y: point.y,
      time: point.time,
    })),
    imageID: annotation.imageID as string,
  }));
};

interface ValidateWorkerParams {
  app: AppStateType;
  imageNetHit: ImageNetHIT;
  imageNetAnnotationId: string;
}
interface ValidateWorkerResult {
  isDone: boolean;
  isSameAssignment: boolean;
  initialSubmitCount: number;
  imageNetAnnotationId: string;
}
export const validateWorker = async (params: ValidateWorkerParams) => {
  const { app, imageNetHit, imageNetAnnotationId } = params;
  if (
    typeof app.hitDatasetName !== "string" ||
    typeof app.imageNetHitId !== "string" ||
    typeof app.workerId !== "string"
  ) {
    alert("hitDatasetName, imageNetHitId, workerId are not found");
    throw new Error("hitDatasetName, imageNetHitId, workerId are not found");
  }

  const result: ValidateWorkerResult = {
    isDone: false,
    isSameAssignment: false,
    initialSubmitCount: app.submitCount,
    imageNetAnnotationId,
  };

  const imageNetAnnotations = await searchImageNetAnnotation({
    hitDatasetName: app.hitDatasetName,
    imageNetHitID: app.imageNetHitId,
    workerID: app.workerId,
  });

  // If the worker has already done this hitDatasetName,
  const doneOne = imageNetAnnotations.find(({ isDone }) => isDone);
  if (imageNetHit.isUnique && !!doneOne) {
    result.isDone = true;
    result.isSameAssignment = doneOne.imageNetHitID === imageNetHit.id;
    return result;
  }

  // If the worker has already submitted the annotation,
  const sameOne = imageNetAnnotations.find(
    ({ imageNetHitID }) => imageNetHitID === imageNetHit.id
  );
  if (sameOne) {
    result.initialSubmitCount = sameOne.pageCount + 1;
    result.imageNetAnnotationId = sameOne.id;
  }
  return result;
};
