// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atom } from "recoil";
import DefaultApp from "./default";
import { AppAtomType } from "./type";

const AppAtom = atom<AppAtomType>({
  key: "appAtom",
  default: DefaultApp,
});

export default AppAtom;
