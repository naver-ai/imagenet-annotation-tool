// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atom } from "recoil";
import DefaultImageNet from "./default";
import { ImageNetAtomType } from "./type";

const ImageNetAtom = atom<ImageNetAtomType>({
  key: "ImageNetAtom",
  default: DefaultImageNet,
});

export default ImageNetAtom;
