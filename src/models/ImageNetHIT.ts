// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
interface Class {
  id: string;
  description: string;
  synset: string[];
  wikipedia: string[];
  wnid: string;
}

interface Image {
  id: string;
  url: string;
}

export interface ImageNetHIT {
  hitDatasetName: string;
  isUnique?: boolean;
  id: string;
  pages: {
    pageno: number;
    class: Class;
    images: Image[];
  }[];
}
