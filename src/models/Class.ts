// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationCount } from "@constants";

export interface Class {
  id: string;
  wnid: string;
  synset: string[];
  description: string;
  wikipedia: string[];
  annotationCount?: AnnotationCount;
}
