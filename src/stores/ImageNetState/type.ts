// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { ImageNetAnnotation, ImageNetHIT } from "@models";

export interface ImageNetAtomType {
  hit: ImageNetHIT;
  annotation: ImageNetAnnotation;
}
