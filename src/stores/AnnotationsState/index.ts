// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import AnnotationAtomFamily from "./atomFamily";
import AnnotationsSelector from "./selector";
import { AnnotationAtomType, AnnotationsSelectorType } from "./type";

export const AnnotationsState = AnnotationsSelector;
export const AnnotationState = AnnotationAtomFamily;
export type AnnotationStateType = AnnotationAtomType;
export type AnnotationsStateType = AnnotationsSelectorType;
