// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { ImageNetAnnotation, ImageNetHIT } from "@models";

interface CreateImageNetAnnotationParams {
  hitDatasetName: string;
  imageNetHitID: string;
  annotation: ImageNetAnnotation;
  startedAt: number;
}

export default async (params: CreateImageNetAnnotationParams) => {
  const { hitDatasetName, imageNetHitID, annotation, startedAt } = params;

  const hit: ImageNetHIT = await API.post(
    "ImageNetAPI",
    `/api/imagenet/${hitDatasetName}/hits/${imageNetHitID}/annotations`,
    { body: { ...annotation, startedAt } }
  );
  return hit;
};
