// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Image } from "@models";
import { AppState } from "@stores";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import useHandler from "./AnnotationComponent.handler";
import { Container, ImageView, Point } from "./AnnotationComponent.style";

interface AnnotationComponentProps {
  imageNetImage: Image;
  handleError: (erorrImage: Image) => void;
}
const AnnotationComponent: React.FC<AnnotationComponentProps> = (props) => {
  const app = useRecoilValue(AppState);
  const { imageNetImage, handleError } = props;
  const {
    state,
    setState,
    imgRefCallback,
    clickHandler,
    mouseMoveHandler,
    mouseEnterHandler,
    mouseLeaveHandler,
  } = useHandler({ imageNetImage });

  const imageURL = useMemo(
    () =>
      imageNetImage.url?.length > 0
        ? imageNetImage.url
        : imageNetImage.originalUrl,
    []
  );

  const isVisible = useMemo(
    () => state.hovered || state.selected,
    [state.hovered, state.selected]
  );

  return (
    <Container selected={state.selected}>
      <ImageView visible={isVisible} disableBlur={!app.enableBlur}>
        <img
          ref={state.imageLoaded ? imgRefCallback : undefined}
          src={imageURL}
          alt=""
          onMouseMove={mouseMoveHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
          onLoad={() =>
            setState((prevState) => ({
              ...prevState,
              imageLoaded: true,
            }))
          }
          onError={() => handleError(imageNetImage)}
        />
        {state.error && <div>Error</div>}
        {(app.debugMode || app.enableShowPoint) && state.checkedAtLeastOnce && (
          <Point
            x={state.ratioX * state.imageWidth + state.imageInnerX}
            y={state.ratioY * state.imageHeight + state.imageInnerY}
            color="red"
          />
        )}
        {app.debugMode &&
          state.selected &&
          state.hovered &&
          state.mouseTracking?.[state.mouseTrackingFrame] && (
            <Point
              x={
                state.mouseTracking[state.mouseTrackingFrame].x *
                  state.imageWidth +
                state.imageInnerX
              }
              y={
                state.mouseTracking[state.mouseTrackingFrame].y *
                  state.imageHeight +
                state.imageInnerY
              }
              color="orange"
            />
          )}
      </ImageView>
      {app.debugMode && (
        <div>
          <div>
            Check at least once : {state.checkedAtLeastOnce ? "true" : "false"}
          </div>
          <div>Selected count : {state.selectedCount}</div>
          <div>Mouse hovered count : {state.hoveredCount}</div>
          <div>Point X (0.0~1.0) : {state.ratioX}</div>
          <div>Point Y (0.0~1.0) : {state.ratioY}</div>
          <div>Image X (px) : {state.imageX}</div>
          <div>Image Y (px) : {state.imageY}</div>
          <div>Image width (px) : {state.imageWidth}</div>
          <div>Image height (px) : {state.imageHeight}</div>
          <div>Estimate time (ms) : {state.estimateTime}</div>
        </div>
      )}
    </Container>
  );
};

export default AnnotationComponent;
