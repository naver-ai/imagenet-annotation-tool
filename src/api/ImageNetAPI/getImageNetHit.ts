// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { ImageNetHIT } from "@models";

export default async (hitDatasetName: string, imageNetHitID: string) => {
  const hit: ImageNetHIT = await API.get(
    "ImageNetAPI",
    `/api/imagenet/${hitDatasetName}/hits/${imageNetHitID}`,
    {}
  );
  return hit;
};
