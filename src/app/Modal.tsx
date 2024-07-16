import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { BodyLock } from "./BodyLock";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  closeModal: () => void;
  layoutId?: string;
};

const Modal: FC<ModalProps> = ({
  children,
  className,
  closeModal,
  layoutId,
}) => {
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
      <div className="w-[calc(100vw-2rem)] mx-auto md:max-w-3xl m-3 sm:mx-auto h-[90vh] md:h-[90vh] md:w-full z-[100] flex flex-col items-center justify-center">
        <div
          className={twMerge(
            `flex flex-col border-opacity-50 shadow-sm pointer-events-auto w-full overflow-hidden transition-all overflow-y-scroll md:overflow-y-hidden relative`,
            className
          )}
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
                className={`w-12 h-12 md:w-5 md:h-5 rounded-full absolute right-4 top-4 cursor-pointer bg-black bg-opacity-30 p-1 transition-opacity ${
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
