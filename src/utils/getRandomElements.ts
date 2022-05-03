// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
const getRandomElements = <T extends any>(
  elements: T[],
  count: number
): T[] => {
  const tmp = [...elements];
  const randomElements: T[] = [];
  for (let i = 0; i < count; i += 1) {
    if (tmp.length === 0) {
      return randomElements;
    }
    const random = Math.floor(Math.random() * tmp.length);
    randomElements.push(tmp[random]);
    tmp.splice(random, 1);
  }
  return randomElements;
};

export default getRandomElements;
