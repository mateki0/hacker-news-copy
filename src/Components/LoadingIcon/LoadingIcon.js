import React from 'react';
import styled, { keyframes } from 'styled-components';
const First = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;
const Second = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
`;
const Third = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
`;
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;
const Dot = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  &:nth-child(1) {
    left: 8px;
    animation: ${First} 0.6s infinite;
  }
  &:nth-child(2) {
    left: 8px;
    animation: ${Second} 0.6s infinite;
  }
  &:nth-child(3) {
    left: 32px;
    animation: ${Second} 0.6s infinite;
  }
  &:nth-child(4) {
    left: 56px;
    animation: ${Third} 0.6s infinite;
  }
`;

const LoadingIcon = () => {
  return (
    <Loading>
      <Dot></Dot>
      <Dot></Dot>
      <Dot></Dot>
      <Dot></Dot>
    </Loading>
  );
};

export default LoadingIcon;
