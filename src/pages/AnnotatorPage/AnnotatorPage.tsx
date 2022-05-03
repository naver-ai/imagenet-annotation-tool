// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationComponent } from "@components";
import { AppState } from "@stores";
import { capitalize } from "@utils";
import React, { useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import useHandler from "./AnnotatorPage.handler";
import {
  Container,
  DisplayJSON,
  ErrorText,
  Grid,
  Instruction,
  Loading,
  OverlayLoading,
  SubmitButton,
} from "./AnnotatorPage.style";

const AnnotatorPage = () => {
  const [app, setApp] = useRecoilState(AppState);
  const { state, createHIT, handleError, submitHandler, term } = useHandler();

  useLayoutEffect(() => {
    createHIT();
    setApp((app) => ({ ...app, startedAt: new Date().getTime() }));
    return () => undefined;
  }, []);

  if (app.surveyCode) {
    return (
      <Container>
        <h1>Thank you!</h1>
        <h2>
          Your survey code is{" "}
          <span style={{ color: "red" }}>{app.surveyCode}</span>
        </h2>
        <p>
          You&rsquo;ve submitted all annotations.
          <br />
          Put this survey code in AWS Mturk survey form.
        </p>
      </Container>
    );
  }

  if (app.error) {
    return (
      <Container>
        <h1>Error</h1>
        <h2>{app.error}</h2>
      </Container>
    );
  }

  return (
    <Container>
      {app.imageNetClass.id.length > 0 && (
        <Instruction>
          <div className="bold">
            Which of these images contain at least one object of type
          </div>
          <div className="term">{term}</div>
          <div className="italic">
            Definition: {capitalize(app.imageNetClass.description)}
          </div>
          <hr />
          <p className="gray">
            For each of the following images, click the image if it contains at
            least one object of type {term}. Select an image if it contains the
            object regardless of occlusions, other objects, or clutter or text
            in the scene. Only select if images are photographs{" "}
            <strong>(no drawings or paintings)</strong>.
          </p>
          <div>Please make accurate selections!</div>
          <div>
            If you are unsure about the object meaning, please consult the
            following Wikipedia page(s) or google the objects yourself:{" "}
            {app.imageNetClass.wikipedia.map((page) => (
              <div key={page}>
                <a href={page} target="_blank" rel="noreferrer">
                  {page}
                  <img
                    src="https://img.icons8.com/material-two-tone/24/000000/external-link.png"
                    alt="External Link"
                  />
                </a>
                (open in new tab)
              </div>
            ))}
          </div>
          <div>
            If it is impossible to complete a HIT due to missing data or other
            problems, please return the HIT.
          </div>
        </Instruction>
      )}

      {state.loading ? (
        <Loading>
          <span />
          Image Data Loading...
        </Loading>
      ) : app.currentImages?.length === 0 ? (
        <ErrorText>
          <h1>Error</h1>
          <div>{state.error}</div>
        </ErrorText>
      ) : (
        <Grid>
          {app.currentImages.map((imageNetImage) => (
            <AnnotationComponent
              key={imageNetImage.id}
              imageNetImage={imageNetImage}
              handleError={handleError}
            />
          ))}
        </Grid>
      )}
      <SubmitButton type="button" onClick={submitHandler}>
        {state.submitting ? "Submitting..." : "Submit"}
      </SubmitButton>
      <div>
        {app.submitCount} page(s) / {app.totalSubmitCount} pages
      </div>

      {state.submitting && (
        <OverlayLoading>
          <div />
        </OverlayLoading>
      )}

      {app.debugMode && (
        <DisplayJSON>
          <code>{JSON.stringify(app, null, 2)}</code>
        </DisplayJSON>
      )}
    </Container>
  );
};

export default AnnotatorPage;
