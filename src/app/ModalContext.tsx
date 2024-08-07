import { createContext, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { AnimatePresence } from "framer-motion";

export const ModalContext = createContext({
  // modal contents
  modalContents: null as React.ReactNode | null,
  setModalContents: (contents: React.ReactNode | null) => {},
  // modal class name
  modalClassName: "",
  setModalClassName: (className: string) => {},
  // fn to call when modal is closed
  onCloseFn: () => {},
  setOnCloseFn: (fn: () => void | null) => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContents, setModalContents] = useState<React.ReactNode | null>(
    null
  );
  const [modalClassName, setModalClassName] = useState<string>("");
  const [onCloseFn, setOnCloseFn] = useState<() => void>(() => () => {});

  const providerValue = useMemo(
    () => ({
      modalContents,
      setModalContents,
      modalClassName,
      setModalClassName,
      onCloseFn,
      setOnCloseFn,
    }),
    [modalClassName, modalContents, onCloseFn]
  );

  return (
    <ModalContext.Provider value={providerValue}>
      <div
        className={`${
          !!modalContents ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {children}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {modalContents && (
          <Modal
            closeModal={() => {
              onCloseFn?.();
              setOnCloseFn(() => {});
              setModalContents(null);
            }}
            className={modalClassName}
          >
            {modalContents}
          </Modal>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
