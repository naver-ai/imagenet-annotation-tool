// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { selector } from "recoil";
import AppAtom from "./atom";
import { AppSelectorType } from "./type";

const AppSelector = selector<AppSelectorType>({
  key: "appSelector",
  get: ({ get }) => {
    const app = get(AppAtom);

    const enableShowPoint = [
      "POINTER_NO_ORIGINAL",
      "POINTER_ORIGINAL",
    ].includes(app.version);

    const enableBlur = [
      "NO_POINTER_NO_ORIGINAL",
      "POINTER_NO_ORIGINAL",
    ].includes(app.version);

    const isForImageNetHIT =
      typeof app.hitDatasetName !== "undefined" &&
      typeof app.imageNetHitId !== "undefined";

    return {
      ...app,
      enableShowPoint,
      enableBlur,
      isForImageNetHIT,
    };
  },
  set: ({ set }, newValue) => {
    set(AppAtom, newValue);
  },
});

export default AppSelector;
