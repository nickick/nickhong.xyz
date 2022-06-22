import { keyframes } from '@emotion/react';

export const entranceAnimationDelay = 1;

export const entranceAnimationDuration = 1;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const bounceUp = keyframes`
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
  }
  100% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
  }
`;

const initialHeight = 35;

export const fadeInLogo = keyframes`
  0% {
    -webkit-transform: scale(1.2) translateY(${initialHeight}vh) translateX(3rem);
    transform: scale(1.2) translateY(${initialHeight}vh) translateX(3rem);
    opacity: 0;
  }

  70% {
    -webkit-transform: scale(1.2) translateY(${initialHeight}vh) translateX(0rem);
    transform: scale(1.2) translateY(${initialHeight}vh) translateX(0rem);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
`;

export const fadeFromBelow = keyframes`
  0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

export const slideFromLeft = keyframes`
  0% {
    -webkit-transform: translateX(100px);
            transform: translateX(100px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
            opacity: 1;
  }
`;
