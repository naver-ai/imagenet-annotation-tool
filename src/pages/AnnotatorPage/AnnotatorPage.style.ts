// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px 0;
`;

export const Instruction = styled.div`
  text-align: center;
  padding: 16px;
  font-size: 18px;
  width: 1028px;
  margin: 0 auto;
  .term {
    color: red;
    font-size: 24px;
    font-weight: bold;
  }
  & .bold {
    font-weight: bold;
  }
  & .italic {
    font-style: italic;
  }
  & div {
    margin: 8px 0px;
  }
  & .gray {
    color: #666;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(3, 340px);
`;

export const ErrorText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1024px;
  margin: 12px auto;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
  font-size: 18px;
  max-width: 1024px;
  margin: 12px auto;

  & > span {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #ccc;
    border-top-color: #000;
    animation: loading 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 12px;
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  padding: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #45a049;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const OverlayLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid rgba(0, 0, 0, 0.1);
    border-top-color: #fff;
    animation: overlay-loading 1s linear infinite;
  }

  @keyframes overlay-loading {
    0% {
      transform: rotate(0deg);
      border-width: 10px;
    }
    100% {
      transform: rotate(360deg);
      border-width: 10px;
    }
  }
`;

export const DisplayJSON = styled.pre`
  overflow: auto;
  max-height: 500px;
  padding: 10px;
  background-color: #eee;
  border-radius: 10px;
  width: 100%;
  max-width: 1024px;
`;
