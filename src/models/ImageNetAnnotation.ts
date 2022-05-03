// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion } from "@constants";
import { ImageNetAnnotationPage } from "@models";

export interface ImageNetAnnotation {
  hitDatasetName?: string;
  imageNetHitID?: string;
  id: string;
  annotatorID: string;
  workerID?: string;
  hitID?: string;
  assignmentID?: string;
  version: AnnotationVersion;
  createdAt?: string;
  pages?: ImageNetAnnotationPage[];
  isDone?: boolean;
}
