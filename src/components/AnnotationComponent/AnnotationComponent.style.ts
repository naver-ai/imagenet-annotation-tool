// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import styled, { css } from "styled-components";

// Container
interface ContainerProps {
  selected?: boolean;
}
export const Container = styled.div<ContainerProps>`
  margin: 4px;
  padding: 0px;
  border: 4px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: content-box;
  ${({ selected = false }) =>
    selected
      ? css`
          border-color: #00b0ff;
        `
      : ""}
`;

// ImageView
interface ImageViewProps {
  visible: boolean;
  disableBlur: boolean;
}
export const ImageView = styled.div<ImageViewProps>`
  user-select: none;
  margin: 0px;
  padding: 0px;
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 340px;

  & > img {
    max-width: 100%;
    max-height: 100%;

    cursor: pointer;
    display: block;
    margin: 0px;
    padding: 0px;
    ${({ visible = false, disableBlur }) =>
      disableBlur
        ? css``
        : visible
        ? css``
        : css`
            opacitcy: 0.2;
            filter: blur(8px);
          `};
  }
`;

// Point
interface PointProps {
  x: number;
  y: number;
  color?: string;
}
export const Point = styled.div<PointProps>`
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color = "red" }) => color};
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
