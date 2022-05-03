// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AppState, UserState } from "@stores";
import Amplify from "aws-amplify";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import awsconfig from "./aws-exports";  // Not available in the public repository, for a good reason :)
import Header from "./components/Header";
import AnnotatorPage from "./pages/AnnotatorPage";

Amplify.configure(awsconfig);

const App = () => {
  const app = useRecoilValue(AppState);
  const user = useRecoilValue(UserState);

  return (
    <>
      {(user.isAdmin || app.page === "admin") && user.id?.length > 0 && (
        <Header />
      )}
      {app.page === "annotator" ? (
        <AnnotatorPage />
      ) : null}
    </>
  );
};

export default App;
