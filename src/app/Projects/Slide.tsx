import { motion, useSpring } from "framer-motion";
import { FC, useCallback, useEffect } from "react";
import { Project, ProjectProps } from "./Project";
import { ProjectSlideState } from ".";

type SlideProps = {
  onHoverStart: () => void;
  onHoverEnd: () => void;
  index: number;
  slideState: ProjectSlideState;
};

const Slide: FC<SlideProps> = ({
  onHoverStart,
  onHoverEnd,
  index,
  slideState,
  ...projectProps
}) => {
  const rotationInitial = -5;
  const slideInitial = -16;

  const rotation = useSpring(rotationInitial);
  const slide = useSpring(slideInitial);

  const slideProjectCard = useCallback(
    (direction: string) => {
      slide.set(direction === "right" ? 45 : -45);
    },
    [slide]
  );

  const resetCard = useCallback(
    (index: number) => {
      slide.set(slideInitial * index);
      rotation.set(rotationInitial);
    },
    [slide, slideInitial, rotation, rotationInitial]
  );

  const focusCard = useCallback(() => {
    console.log("here");
    slide.set(0);
    rotation.set(0);
  }, [slide, rotation]);

  useEffect(() => {
    if (slideState === ProjectSlideState.LEFT) {
      slideProjectCard("left");
    } else if (slideState === ProjectSlideState.RIGHT) {
      slideProjectCard("right");
    } else if (slideState === ProjectSlideState.FOCUS) {
      focusCard();
    } else {
      resetCard(index);
    }
  }, [focusCard, index, resetCard, slideProjectCard, slideState]);

  return (
    <motion.div
      style={{
        width: "100%",
        cursor: "pointer",
        x: slide,
        perspective: 200,
        position: "relative",
        zIndex: 15 - index,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        style={{
          width: "100%",
          rotateY: rotation,
        }}
      >
        <Project {...(projectProps as ProjectProps)} />
      </motion.div>
    </motion.div>
  );
};

export { Slide };
