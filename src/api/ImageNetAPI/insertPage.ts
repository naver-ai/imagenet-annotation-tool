// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { ImageNetAnnotationPage, ImageNetHIT } from "@models";

interface InsertPageParams {
  hitDatasetName: string;
  imageNetAnnotationId: string;
  page: ImageNetAnnotationPage;
  isDone?: boolean;
}

export default async (params: InsertPageParams) => {
  const { hitDatasetName, imageNetAnnotationId, page, isDone = false } = params;

  const endedAt = new Date().getTime();

  const hit: ImageNetHIT = await API.put(
    "ImageNetAPI",
    `/api/imagenet/${hitDatasetName}/annotations/${imageNetAnnotationId}`,
    {
      body: {
        page: { ...page, endedAt },
        endedAt,
        isDone,
      },
    }
  );
  return hit;
};
