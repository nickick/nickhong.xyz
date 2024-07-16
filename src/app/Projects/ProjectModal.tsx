import { motion } from "framer-motion";
import { FC } from "react";
import { Project } from "./projectData";
import { serif } from "../fonts";
import Image from "next/image";

type ProjectModalProps = {
  selectedProject: Project;
};

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

const ProjectModal: FC<ProjectModalProps> = ({ selectedProject }) => {
  return (
    <motion.div
      className={`flex flex-col-reverse ${
        selectedProject?.imageOnLeft ? "md:flex-row-reverse" : "md:flex-row"
      } ${
        !!selectedProject
          ? "backdrop-blur-lg bg-black bg-opacity-50"
          : "backdrop-blur-0"
      }`}
      initial="hidden"
      animate="visible"
      variants={dropIn}
      layoutId={selectedProject?.name.concat()}
      style={{
        WebkitBackdropFilter: `${!!selectedProject ? "blur(20px)" : "blur(0)"}`,
      }}
    >
      {selectedProject && (
        <motion.div
          className={`h-[34rem] w-full md:w-96 bg-cover bg-center`}
          style={{
            backgroundImage: `url('${selectedProject.image}')`,
          }}
          layoutId={selectedProject.image}
        />
      )}
      <div className="w-full p-8 flex flex-col text-white">
        <motion.div
          layoutId={`${selectedProject.name}-label`}
          className={`${serif.className} text-3xl`}
        >
          {selectedProject.name}
        </motion.div>
        <div className="flex gap-4 my-4">
          <a
            href={selectedProject.href}
            target="_blank"
            rel="noreferrer"
            className="animate-[fadeIn_1s_both]"
          >
            <Image
              src="/icons/link.svg"
              alt={`Link for ${selectedProject.name}`}
              height={50}
              width={50}
              className="w-10 h-10 rounded-full p-2 border border-gray-300 hover:border-white transition-colors"
            />
          </a>
          {selectedProject.contributors.map(({ link, icon }, index) => (
            <div key={`contributor-${index}`}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={`opacity-0 animate-[fadeIn_1s_both_${(
                  1 +
                  index * 0.2
                ).toFixed(1)}s]`}
              >
                <Image
                  src={icon}
                  alt={`Twitter for ${link}`}
                  height={50}
                  width={50}
                  className="w-10 h-auto rounded-full"
                />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-2 text-base md:text-base">
          {selectedProject.description.map((desc, index) => (
            <div dangerouslySetInnerHTML={{ __html: desc }} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export { ProjectModal };
