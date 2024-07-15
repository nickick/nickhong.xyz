import { FC } from "react";
import { Modal } from "../Modal";
import { Project } from "./projectData";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

type ProjectModalProps = {
  selectedProject?: Project;
  setClosed: () => void;
};

const ProjectModal: FC<ProjectModalProps> = ({
  selectedProject,
  setClosed,
}) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      <Modal
        open={!!selectedProject}
        closeModal={setClosed}
        layoutId={selectedProject?.name}
      >
        <div className="border border-white p-4 z-50">Test</div>
        {selectedProject && (
          <motion.div
            className={`h-96 bg-cover bg-center w-96`}
            style={{
              backgroundImage: `url('${selectedProject.image}')`,
            }}
            layoutId={selectedProject.image}
          />
        )}
      </Modal>
    </AnimatePresence>
  );
};

export { ProjectModal };
