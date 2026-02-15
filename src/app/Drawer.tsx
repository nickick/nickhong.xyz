import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
};

const drawerVariants = {
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const backdropVariants = {
  closed: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    backdropFilter: "blur(20px)",
    transition: {
      duration: 0.3,
    },
  },
};

const Drawer: FC<DrawerProps> = ({ children, open }) => {
  return (
    <div className="flex md:hidden">
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-black/50"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
            />
            <motion.div
              className="fixed top-0 left-0 z-[90] w-[calc(100vw-40px)] h-full bg-gray-900 bg-opacity-50 shadow-lg"
              style={{ WebkitBackdropFilter: "blur(20px)" }}
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-6 py-4 relative h-full">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Drawer };
