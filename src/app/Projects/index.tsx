import { FC } from "react";
import { motion, useSpring } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { projects } from "./projectData";
import useActiveSection from "@/app/hooks/useActiveSection";
import { Slide } from "./Slide";
import { serif } from "../fonts";

export enum ProjectSlideState {
  LEFT,
  RIGHT,
  FOCUS,
  NONE,
}

const Projects: FC = () => {
  const [focusedProject, setFocusedProject] = useState(null);

  const selectedProject = projects.find(
    (project) => project.name === focusedProject
  );

  const handleClose = useCallback(() => {
    setFocusedProject(null);
  }, []);

  const [projectSlideStates, setProjectSlideStates] = useState<
    ProjectSlideState[]
  >(
    projects.map(() => {
      return ProjectSlideState.NONE;
    })
  );

  const hoverchange = useCallback(
    ({ hover, index }: { hover: boolean; index: number }) => {
      console.log(hover, index);
      let newProjectSlideStates: ProjectSlideState[] = [];
      if (hover) {
        newProjectSlideStates = projects.map((_, i) => {
          if (i < index) {
            return ProjectSlideState.LEFT;
          } else if (i === index) {
            return ProjectSlideState.FOCUS;
          } else {
            return ProjectSlideState.RIGHT;
          }
        });
      } else {
        projects.map((_, i) => {
          newProjectSlideStates[i] = ProjectSlideState.NONE;
        });
      }
      setProjectSlideStates(newProjectSlideStates);
    },
    []
  );

  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const [inViewRef, inAnimationView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { setSectionInView } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setSectionInView("Projects", "add");
    } else {
      setSectionInView("Projects", "delete");
    }
  }, [inView, setSectionInView]);

  const setRefs = useCallback(
    (node: Element | null) => {
      ref(node);
      inViewRef(node);
    },
    [ref, inViewRef]
  );

  return (
    <div
      className={`flex flex-col w-full px-8 md:px-36 max-w-screen-xl mx-auto pt-24 opacity-0 ${
        inAnimationView ? "animate-fadeInAfterDelay" : ""
      }`}
      ref={setRefs}
      id="projects"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start">
        <h2 className={`flex-[1] ${serif.className} text-3xl`}>
          Web3 Projects
        </h2>
        <p className="flex-[3] text-xl gap-4 flex flex-col leading-relaxed">
          I&apos;ve worked as a Solidity/React engineer on several projects in
          the NFT space for artists like DrifterShoots and Brendan North, as
          well as for celebrities like Patrick Mahomes and Dana Taylor.
        </p>
      </div>
      <div className="flex mt-12">
        {projects.map((project, index) => (
          <Slide
            key={`slide-${index}`}
            {...project}
            slideState={projectSlideStates[index]}
            onHoverStart={() => {
              hoverchange({ hover: true, index });
            }}
            onHoverEnd={() => {
              hoverchange({ hover: false, index });
            }}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export { Projects };
