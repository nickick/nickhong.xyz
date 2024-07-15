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
    <div className="h-full border border-[rgba(255,255,255,0.3)] hover:shadow-inner transition-shadow">
      <div className="p-3">{name}</div>
      <motion.div
        className="min-h-[20rem] md:min-h-[30rem] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
        layoutId={image}
      />
    </div>
  );
};

export { Project };
