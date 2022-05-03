// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
export const getRatioXY = (
  event: React.MouseEvent<HTMLDivElement>
): [number, number] => {
  const { offsetWidth, offsetHeight } = event.nativeEvent
    .target as HTMLDivElement;
  const { offsetX, offsetY } = event.nativeEvent;
  const ratioX = offsetX / offsetWidth;
  const ratioY = offsetY / offsetHeight;
  return [ratioX, ratioY];
};

export const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) => {
  let timer: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    if (!timer) {
      fn(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
    }
  };
};
