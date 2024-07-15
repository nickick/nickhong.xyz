import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { BodyLock } from "./BodyLock";

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
  layoutId?: string;
};

const Modal: FC<ModalProps> = ({ children, closeModal, layoutId }) => {
  const [bodyLock, setBodyLock] = useState<boolean>(false);

  useEffect(() => {
    setBodyLock(!!children);
  }, [children]);

  return (
    <div
      className={`size-full fixed inset-0 start-0 overflow-x-hidden transition-all overflow-y-auto ${
        !!children
          ? "bg-black bg-opacity-50 opacity-100 z-[999]"
          : "opacity-0 z-0"
      }`}
      onClick={() => {
        closeModal();
      }}
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[90vh] w-full z-[100] flex flex-col items-center justify-center">
        <div
          className="flex flex-col bg-black bg-opacity-80 backdrop-blur-lg border border-gray-300 border-opacity-50 shadow-sm pointer-events-auto h-96 w-full overflow-hidden"
          style={{ WebkitBackdropFilter: "blur(20px)" }}
        >
          <motion.div
            className=""
            initial="hiddden"
            animate="visible"
            exit="exit"
            layoutId={layoutId}
          >
            {children}
            {bodyLock && <BodyLock />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
