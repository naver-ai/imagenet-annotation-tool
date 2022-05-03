// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { ImageNetAnnotation } from "@models";

interface ImageNetAnnotationWithPageCount extends ImageNetAnnotation {
  pageCount: number;
}

interface SearchImageNetAnnotationsRequest {
  hitDatasetName: string;
  imageNetHitID: string;
  workerID: string;
}

export default async (request: SearchImageNetAnnotationsRequest) => {
  const { hitDatasetName, imageNetHitID, workerID } = request;

  const hit: ImageNetAnnotationWithPageCount[] = await API.get(
    "ImageNetAPI",
    `/api/imagenet/${hitDatasetName}/hits/${imageNetHitID}/annotations`,
    {
      queryStringParameters: {
        workerID,
      },
    }
  );
  return hit;
};
