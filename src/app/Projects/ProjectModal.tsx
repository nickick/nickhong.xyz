import { motion } from "framer-motion";
import { FC } from "react";
import { Project } from "./projectData";

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
      className={`flex flex-col shadow-inner ${
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
          className={`h-96 w-96 bg-cover bg-center`}
          style={{
            backgroundImage: `url('${selectedProject.image}')`,
          }}
          layoutId={selectedProject.image}
        />
      )}
    </motion.div>
  );
};

export { ProjectModal };
