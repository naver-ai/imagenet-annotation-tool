// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atomFamily, SerializableParam } from "recoil";
import DefaultAnnotation from "./default";
import { AnnotationAtomType } from "./type";

const AnnotationAtomFamily = atomFamily<AnnotationAtomType, SerializableParam>({
  key: "AnnotationAtomFamily",
  default: DefaultAnnotation,
});

export default AnnotationAtomFamily;
