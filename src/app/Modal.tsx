import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { BodyLock } from "./BodyLock";
import Image from "next/image";

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal: FC<ModalProps> = ({ children, closeModal }) => {
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
      <div className="sm:max-w-3xl sm:w-full m-3 sm:mx-auto h-[90vh] w-full z-[100] flex flex-col items-center justify-center">
        <div
          className={`flex flex-col border-opacity-50 shadow-sm pointer-events-auto w-full overflow-hidden transition-all`}
          style={{
            WebkitBackdropFilter: `${!!children ? "blur(20px)" : "blur(0)"}`,
          }}
        >
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
            {bodyLock && <BodyLock />}
            {!!children && (
              <Image
                src="/icons/close.svg"
                alt="close"
                height={20}
                width={20}
                className={`w-5 h-5 rounded-full absolute right-4 top-4 cursor-pointer bg-black bg-opacity-30 p-1 transition-opacity ${
                  !!children ? "opacity-50 hover:opacity-100" : "opacity-0"
                }`}
                onClick={() => closeModal()}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
