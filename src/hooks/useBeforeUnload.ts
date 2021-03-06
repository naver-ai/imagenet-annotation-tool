// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import React, { useCallback, useEffect } from "react";

// 업로드 중 페이지 떠날 시, 확인 문구 발생
export default (
  value?: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [beforeUnload, setBeforeUnload] = React.useState(value ?? false);

  const beforeUnloadHandler = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue =
      "Now uploading your annotation data to database server. Are you sure leave here?";
    return "Now uploading your annotation data to database server. Are you sure leave here?";
  }, []);

  useEffect(() => {
    if (beforeUnload) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
  }, [beforeUnload]);

  useEffect(() => {
    setBeforeUnload(value ?? false);
  }, [value]);

  return [beforeUnload, setBeforeUnload];
};
