import { FC, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export type ProjectProps = {
  name: string;
  href: string;
  image: string;
  setFocusedProject: (name: string) => void;
  index: number;
};

const Project: FC<ProjectProps> = ({
  name,
  href,
  image,
  setFocusedProject,
  index,
}) => {
  const onClick = useCallback(() => {
    setFocusedProject(name);
  }, [name, setFocusedProject]);
  return (
    <div>
      <motion.div
        className="min-h-[40rem] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></motion.div>
    </div>
  );
};

export { Project };
