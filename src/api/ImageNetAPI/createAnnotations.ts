// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { AnnotationVersion } from "@constants";
import { AnnotationsStateType } from "@stores";

export default async (
  annotations: AnnotationsStateType,
  extraData: {
    annotatorID: string;
    version: AnnotationVersion;
    workerID?: string;
    assignmentID?: string;
    hitID?: string;
  }
) => {
  const { annotatorID, version, workerID, assignmentID, hitID } = extraData;

  const body = {
    annotations: annotations.map((annotation) => ({
      selectedCount: annotation.selectedCount,
      hoveredCount: annotation.hoveredCount,
      selected: annotation.selected,
      mousePoint: {
        x: annotation.ratioX,
        y: annotation.ratioY,
      },
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
      })),
      annotatorID,
      workerID,
      assignmentID,
      hitID,
      imageID: annotation.imageID as string,
      version,
    })),
  };

  await API.post("ImageNetAPI", "/api/annotations", {
    body,
  });
};
