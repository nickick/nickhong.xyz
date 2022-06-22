import { motion } from 'framer-motion';
import {
  func, number, oneOfType, string,
} from 'prop-types';
import { childrenProps } from '../utils/propTypes';
import Backdrop from './Backdrop';

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function Modal({ children, layoutId, handleClose }) {
  return (
    <Backdrop
      onClick={handleClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'clamp(400px, 1000px, 1200px)',
          height: 'min(50%, 300px)',
          margin: 'auto',
          padding: '0 2rem',
          borderRadius: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variants={dropIn}
        initial="hiddden"
        animate="visible"
        exit="exit"
        layoutId={layoutId}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}

Modal.propTypes = {
  layoutId: oneOfType([number, string]).isRequired,
  children: childrenProps.isRequired,
  handleClose: func.isRequired,
};
