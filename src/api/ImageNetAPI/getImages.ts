// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { Class, Image } from "@models";

export default async (imageNetClass: Class) => {
  const images: Required<Image>[] = (await API.get(
    "ImageNetAPI",
    `/api/classes/${imageNetClass.id}/images`,
    {}
  )) as Required<Image>[];

  if (images.length === 0) {
    return [];
  }

  return images;
};
