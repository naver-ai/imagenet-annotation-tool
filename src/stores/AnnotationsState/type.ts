// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Point } from "@models";

type HoveredRecordAction = "enter" | "leave";
interface HoveredRecord {
  action: HoveredRecordAction;
  time: number;
}

interface PointWithTime extends Point {
  time: number;
}

export type AnnotationAtomType = {
  error: boolean;
  checkedAtLeastOnce: boolean;
  ratioX: number;
  ratioY: number;
  selected: boolean;
  selectedCount: number;
  selectedRecord: PointWithTime[];
  hovered: boolean;
  hoveredCount: number;
  hoveredRecord: HoveredRecord[];
  imageX: number;
  imageY: number;
  imageInnerX: number;
  imageInnerY: number;
  imageWidth: number;
  imageHeight: number;
  originalImageWidth: number;
  originalImageHeight: number;
  estimateTime: number;
  imageLoaded: boolean;
  mouseTracking: PointWithTime[];
  mouseTrackingFrame: number;
  workerID?: string;
  assignmentID?: string;
  hitID?: string;
  imageID?: string;
};

export type AnnotationsSelectorType = AnnotationAtomType[];
