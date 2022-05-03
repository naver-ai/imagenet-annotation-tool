// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
export interface ImageNetAnnotationPage {
  imageNetAnnotationID?: string;
  id: string;
  pageno: number;
  startedAt?: number;
  endedAt?: number;
  annotations: any[];
}
