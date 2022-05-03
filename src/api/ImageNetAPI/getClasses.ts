// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { Class } from "@models";

const cache = [] as Required<Class>[];
export default async (): Promise<Required<Class>[]> => {
  if (cache.length) {
    return cache;
  }

  const classes: Required<Class>[] = (await API.get(
    "ImageNetAPI",
    "/api/classes",
    {}
  )) as Required<Class>[];

  const results = classes;
  cache.push(...results);
  return results;
};
