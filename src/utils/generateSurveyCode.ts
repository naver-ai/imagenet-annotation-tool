// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
/* eslint-disable no-bitwise */
import { parse } from "query-string";

const generateSurveyCode = (): string => {
  const customHash = (str: string) => {
    /* We mask the hash generation algorithm to prevent misuse. */
    return (0xffffff).toString(16).slice(-6).toUpperCase();
  };

  const { hitId, workerId, assignmentId } = parse(
    window.location.search
  ) as Record<string, string>;

  return customHash(`${hitId}-${workerId}-${assignmentId}`);
};

export default generateSurveyCode;
