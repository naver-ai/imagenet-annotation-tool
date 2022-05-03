// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion } from "@constants";
import { generateUUID } from "@utils";
import { parse } from "query-string";
import { ImageNetAtomType } from "./type";

const {
  version = "NO_POINTER_NO_ORIGINAL",
  assignmentId = undefined,
  workerId = undefined,
  hitId = undefined,
  hitDatasetName = undefined,
  imageNetHitId = undefined,
} = parse(window.location.search);

const DefaultImageNet: ImageNetAtomType = {
  hit: {
    hitDatasetName: (hitDatasetName as string | undefined) ?? "",
    id: (imageNetHitId as string | undefined) ?? "",
    pages: [],
  },
  annotation: {
    id: generateUUID(),
    annotatorID: "",
    version: (version as AnnotationVersion | undefined) ?? "POINTER_ORIGINAL",
    assignmentID: (assignmentId as string | undefined) ?? "",
    hitID: (hitId as string | undefined) ?? "",
    workerID: (workerId as string | undefined) ?? "",
  },
};

export default DefaultImageNet;
