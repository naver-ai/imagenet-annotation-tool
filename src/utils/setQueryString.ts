// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { parse, stringify } from "query-string";

const setQueryString = (value: (queryString: any) => any) => {
  const queryString = parse(window.location.search);
  const newQueryString = value(queryString);
  window.location.search = `?${stringify(newQueryString)}`;
};

export default setQueryString;
