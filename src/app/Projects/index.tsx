import { Section } from "@/app/hooks/useActiveSection";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { FadeInSection } from "../FadeInSection";
import { serif } from "../fonts";
import { projects } from "./projectData";
import { ProjectModal } from "./ProjectModal";
import { Slide } from "./Slide";
import { ModalContext } from "../ModalContext";
import { Link } from "../Link";

export enum ProjectSlideState {
  LEFT,
  RIGHT,
  FOCUS,
  NONE,
}

const Projects: FC = () => {
  const [focusedProject, setFocusedProject] = useState<string | null>(null);

  const selectedProject = projects.find(
    (project) => project.name === focusedProject
  );

  const setFocusState = useCallback(
    ({ index }: { index: number }) => {
      const newProjectSlideStates = projects.map((project, i) => {
        if (i === index || project.name === focusedProject) {
          return ProjectSlideState.FOCUS;
        } else if (i < index) {
          return ProjectSlideState.LEFT;
        } else {
          return ProjectSlideState.RIGHT;
        }
      });

      setProjectSlideStates(newProjectSlideStates);
    },
    [focusedProject]
  );

  const resetFocusStates = useCallback(() => {
    const newProjectSlideStates = projects.map(() => {
      return ProjectSlideState.NONE;
    });

    setProjectSlideStates(newProjectSlideStates);
  }, []);

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
      if (hover) {
        setFocusState({ index });
      } else {
        resetFocusStates();
      }
    },
    [resetFocusStates, setFocusState]
  );

  const { setModalContents, setModalClassName, setOnCloseFn } =
    useContext(ModalContext);

  useEffect(() => {
    if (selectedProject) {
      setModalContents(<ProjectModal selectedProject={selectedProject} />);
      setOnCloseFn(handleClose);
    }
  }, [
    handleClose,
    selectedProject,
    setModalClassName,
    setModalContents,
    setOnCloseFn,
  ]);

  return (
    <FadeInSection
      className={`flex flex-col w-full max-w-screen-xl mx-auto pt-24 z-[30]`}
      section={Section.Projects}
      id="projects"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start px-8 md:px-36">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          Web3 Projects
        </h2>
        <p className="flex-[3] w-full text-xl gap-4 leading-relaxed">
          I&apos;ve worked as a Solidity/React engineer on several projects in
          the NFT space for artists that have raised over $7 milliion to date.
        </p>
      </div>
      <div className="overflow-x-scroll overflow-y-visible md:overflow-x-visible md:overflow-y-visible w-full">
        <div className="flex md:justify-center items-center mt-12 md:mt-24 w-[400%] md:w-full pb-20 md:pb-0 ml-16 md:ml-16">
          {projects.map((project, index) => (
            <Slide
              key={`slide-${index}`}
              {...project}
              slideState={projectSlideStates[index]}
              focusedProject={focusedProject}
              onClick={() => {
                setFocusedProject(project.name);
              }}
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
      <div className="md:mt-24 border-gray-700 border-b mx-8 md:mx-36" />
    </FadeInSection>
  );
};

export { Projects };
