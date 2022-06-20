import { motion } from 'framer-motion';
import { func } from 'prop-types';
import { childrenProps } from '../utils/propTypes';

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: '#000000d7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1200,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

Backdrop.propTypes = {
  onClick: func.isRequired,
  children: childrenProps.isRequired,
};
