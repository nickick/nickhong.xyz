import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  func, number, oneOfType, string,
} from 'prop-types';
import { useCallback } from 'react';
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
  const closeFn = useCallback(() => {
    document.body.style.overflow = 'unset';
    handleClose();
  }, [handleClose]);

  return (
    <Backdrop
      onClick={closeFn}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'clamp(400px, 1000px, 1200px)',
          maxHeight: '80vh',
          margin: 'auto',
          padding: '0 2rem',
          borderRadius: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        variants={dropIn}
        initial="hiddden"
        animate="visible"
        exit="exit"
        layoutId={layoutId}
      >
        <Close
          sx={{
            position: 'absolute',
            top: '5rem',
            right: '5rem',
            fontSize: '30px',
            background: '#00000066',
          }}
          onClick={closeFn}
        />
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
