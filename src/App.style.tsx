// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AmplifyAuthenticator as OriginalAmplifyAuthenticator } from "@aws-amplify/ui-react";
import styled from "styled-components";

export const AmplifyAuthenticator = styled(OriginalAmplifyAuthenticator)`
  :root {
    --padding: 100px;
  }
`;
