// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion, Page } from "@constants";
import { Class, Image } from "@models";

export interface AppAtomType {
  error?: string;
  imageNetClass: Class;
  imageNetImages: Image[];
  currentImages: Image[];
  debugMode: boolean;
  version: AnnotationVersion;
  assignmentId: string | undefined;
  workerId: string | undefined;
  hitId: string | undefined;
  page: Page;
  submitCount: number;
  totalSubmitCount: number;
  surveyCode: string | undefined;
  blacklistClasses: string[];
  hitDatasetName?: string;
  imageNetHitId?: string;
  startedAt: number;
  pageStartedAt: number;
}

export interface AppSelectorType extends AppAtomType {
  enableShowPoint: boolean;
  enableBlur: boolean;
  isForImageNetHIT: boolean;
}
