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
        selectedProject?.imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial="hidden"
      animate="visible"
      variants={dropIn}
      exit={{ opacity: 1 }}
      layoutId={selectedProject?.name.concat()}
    >
      Test
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
