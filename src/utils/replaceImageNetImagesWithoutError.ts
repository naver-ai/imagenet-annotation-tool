// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Image } from "@models";
import { getRandomElement } from "@utils";

const blacklistImage: Image[] = [];
const replaceImageNetImagesWithoutError = (
  imageNetImage: Image[],
  currentImages: Image[],
  errorImage: Image
) => {
  blacklistImage.push(errorImage);
  const newImages = imageNetImage.filter(
    (image) =>
      !blacklistImage.find((each) => each.id === image.id) &&
      !currentImages.find((each) => each.id === image.id)
  );
  const updatedImages = [...currentImages];

  if (newImages.length === 0) {
    const errorImageIndex = updatedImages.findIndex(
      (each) => each.id === errorImage.id
    );
    if (errorImageIndex !== -1) {
      updatedImages.splice(errorImageIndex, 1);
    }
    return updatedImages;
  }
  const newImage = getRandomElement(newImages);
  updatedImages[updatedImages.indexOf(errorImage)] = newImage;
  return updatedImages;
};

export default replaceImageNetImagesWithoutError;
