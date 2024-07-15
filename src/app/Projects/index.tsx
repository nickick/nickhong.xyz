import { Section } from "@/app/hooks/useActiveSection";
import { FC, useCallback, useState } from "react";
import { FadeInSection } from "../FadeInSection";
import { serif } from "../fonts";
import { projects } from "./projectData";
import { Slide } from "./Slide";

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

  return (
    <FadeInSection
      className={`flex flex-col w-full max-w-screen-xl mx-auto pt-24`}
      section={Section.Projects}
      id="projects"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start px-8 md:px-36">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          Web3 Projects
        </h2>
        <p className="flex-[3] w-full text-xl gap-4 flex flex-col leading-relaxed">
          I&apos;ve worked as a Solidity/React engineer on several projects in
          the NFT space for artists like DrifterShoots and Brendan North, as
          well as for celebrities like Patrick Mahomes and Dana Taylor.
        </p>
      </div>
      <div className="overflow-x-scroll overflow-y-visible md:overflow-x-visible md:overflow-y-visible w-full">
        <div className="flex mt-12 w-[400%] md:w-full pb-20 md:pb-0">
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
    </FadeInSection>
  );
};

export { Projects };
