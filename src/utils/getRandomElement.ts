// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
const getRandomElement = <T extends any>(elements: T[]): T => {
  const random = Math.floor(Math.random() * elements.length);
  return elements[random];
};

export default getRandomElement;
