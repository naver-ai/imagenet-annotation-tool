// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationAtomType } from "./type";

const DefaultAnnotation: AnnotationAtomType = {
  error: false,
  checkedAtLeastOnce: false,
  ratioX: 0,
  ratioY: 0,
  selected: false,
  selectedCount: 0,
  selectedRecord: [],
  hovered: false,
  hoveredCount: 0,
  hoveredRecord: [],
  imageX: 0,
  imageY: 0,
  imageInnerX: 0,
  imageInnerY: 0,
  imageWidth: 0,
  imageHeight: 0,
  originalImageWidth: 0,
  originalImageHeight: 0,
  estimateTime: 0,
  imageLoaded: false,
  mouseTracking: [],
  mouseTrackingFrame: 0,
};

export default DefaultAnnotation;
