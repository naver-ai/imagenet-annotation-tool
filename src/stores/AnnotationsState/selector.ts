// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AppState } from "@stores";
import { selector } from "recoil";
import AnnotationsAtomFamily from "./atomFamily";
import { AnnotationsSelectorType } from "./type";

const AnnotationsSelector = selector<AnnotationsSelectorType>({
  key: "annotationsSelector",
  get: ({ get }) => {
    const appState = get(AppState);
    return appState.currentImages.map((imageNetImage) => ({
      ...get(AnnotationsAtomFamily(imageNetImage.id)),
      imageID: imageNetImage.id,
    }));
  },
});

export default AnnotationsSelector;
