// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Image } from "@models";
import { AnnotationState } from "@stores";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { getRatioXY, throttle } from "./AnnotationComponent.util";

interface UseHandlerProps {
  imageNetImage: Image;
}

const useHandler = (props: UseHandlerProps) => {
  const { imageNetImage } = props;
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [state, setState] = useRecoilState(AnnotationState(imageNetImage.id));
  const resetState = useResetRecoilState(AnnotationState(imageNetImage.id));

  useEffect(() => {
    resetState();
  }, []);

  const isEstimating = useMemo(
    () => state.hovered && !state.selected,
    [state.hovered, state.selected]
  );

  const imgRefCallback = useCallback<React.RefCallback<HTMLImageElement>>(
    ($img) => {
      if ($img) {
        const $parent = $img.parentElement as HTMLDivElement;
        const imageInnerX = $img.offsetLeft;
        const imageInnerY = $img.offsetTop;
        const imageX = $parent.offsetLeft + imageInnerX;
        const imageY = $parent.offsetTop + imageInnerY;
        const imageWidth = $img.offsetWidth;
        const imageHeight = $img.offsetHeight;
        const originalImageWidth = $img.naturalWidth;
        const originalImageHeight = $img.naturalHeight;

        setState((prevState) => ({
          ...prevState,
          imageX,
          imageY,
          imageWidth,
          imageHeight,
          imageInnerX,
          imageInnerY,
          originalImageWidth,
          originalImageHeight,
        }));
      }
    },
    []
  );

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const [ratioX, ratioY] = getRatioXY(event);
      setState((prevState) => ({
        ...prevState,
        ratioX,
        ratioY,
        selected: !prevState.selected,
        selectedCount: prevState.selectedCount + (!prevState.selected ? 1 : 0),
        selectedRecord: prevState.selected
          ? [...prevState.selectedRecord]
          : [
              ...prevState.selectedRecord,
              {
                x: ratioX,
                y: ratioY,
                time: Date.now(),
              },
            ],
      }));
    },
    []
  );

  const mouseMoveHandler: React.MouseEventHandler<HTMLDivElement> = useMemo(
    () =>
      throttle((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (state.selected) return;
        const [x, y] = getRatioXY(event);
        setState((prevState) => ({
          ...prevState,
          checkedAtLeastOnce: true,
          ratioX: x,
          ratioY: y,
          mouseTracking: [
            ...prevState.mouseTracking,
            { x, y, time: Date.now() },
          ],
        }));
      }, 1000 / 60),
    [state.selected]
  );

  const mouseEnterHandler: React.MouseEventHandler<HTMLDivElement> =
    useCallback((event) => {
      event.preventDefault();
      event.stopPropagation();
      setState((prevState) => ({
        ...prevState,
        hovered: true,
        hoveredCount: prevState.hoveredCount + 1,
        hoveredRecord: [
          ...prevState.hoveredRecord,
          {
            action: "enter",
            time: Date.now(),
          },
        ],
        mouseTrackingFrame: 0,
      }));
    }, []);

  const mouseLeaveHandler: React.MouseEventHandler<HTMLDivElement> =
    useCallback((event) => {
      event.preventDefault();
      event.stopPropagation();
      setState((prevState) => ({
        ...prevState,
        hovered: false,
        hoveredRecord: [
          ...prevState.hoveredRecord,
          {
            action: "leave",
            time: Date.now(),
          },
        ],
      }));
    }, []);

  useEffect(() => {
    if (!state.checkedAtLeastOnce) return;
    if (isEstimating) {
      const now = Date.now();
      setTimestamp(now);
    } else {
      const now = Date.now();
      if (timestamp)
        setState((prevState) => ({
          ...prevState,
          estimateTime: prevState.estimateTime + (now - timestamp),
        }));
      setTimestamp(null);
    }
  }, [isEstimating, state.checkedAtLeastOnce]);

  useLayoutEffect(() => {
    if (state.selected && state.hovered) {
      requestAnimationFrame(() => {
        setState((prevState) => ({
          ...prevState,
          mouseTrackingFrame:
            (prevState.mouseTrackingFrame + 1) % prevState.mouseTracking.length,
        }));
      });
    }
  }, [state.selected, state.hovered, state.mouseTrackingFrame]);

  return {
    state,
    setState,
    imgRefCallback,
    clickHandler,
    mouseMoveHandler,
    mouseEnterHandler,
    mouseLeaveHandler,
  };
};

export default useHandler;
