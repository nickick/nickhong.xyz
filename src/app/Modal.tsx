import { useLockBodyScroll } from "@uidotdev/usehooks";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  closeModal: () => void;
  layoutId?: string;
};

const BodyLock = () => {
  useLockBodyScroll();
  return <></>;
};

const Modal: FC<ModalProps> = ({ children, open, closeModal, layoutId }) => {
  const [bodyLock, setBodyLock] = useState<boolean>(false);

  useEffect(() => {
    setBodyLock(open);
  }, [open]);

  return (
    <div
      className={`size-full fixed top-0 start-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none ${
        open ? "bg-black bg-opacity-50 opacity-100 z-[90]" : "opacity-0 z-0"
      }`}
      onClick={() => {
        closeModal();
      }}
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto h-screen w-full z-[100] flex flex-col items-center justify-center">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70 h-96">
          <motion.div
            className="flex justify-center items-center py-3 px-4 border-b dark:border-neutral-700"
            initial="hiddden"
            animate="visible"
            exit="exit"
            layoutId={layoutId}
          >
            {open && children}
            {bodyLock && <BodyLock />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
