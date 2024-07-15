import { FC, useCallback } from "react";
import { motion } from "framer-motion";
import { serif } from "../fonts";

export type ProjectProps = {
  name: string;
  href: string;
  image: string;
  index: number;
};

const Project: FC<ProjectProps> = ({ name, href, image, index }) => {
  return (
    <motion.div
      className={`h-full border border-[rgba(255,255,255,0.3)] hover:shadow-inner transition-shadow animate-[fadeIn_1s_both_${
        1 + index * 0.2
      }s]`}
    >
      <motion.div
        className={`p-3 ${serif.className} text-3xl`}
        layoutId={`${name}-label`}
      >
        {name}
      </motion.div>
      <motion.div
        className="min-h-[20rem] md:min-h-[30rem] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
        layoutId={image}
      />
    </motion.div>
  );
};

export { Project };
