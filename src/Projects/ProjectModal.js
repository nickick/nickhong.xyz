import { AnimatePresence } from 'framer-motion';
import { bool, func, string } from 'prop-types';
import Modal from '../Modal';

export default function ProjectModal({
  open, handleClose, layoutId,
}) {
  return (
    <div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter
      >
        {open && (
          <Modal
            handleClose={handleClose}
            layoutId={layoutId}
          >
            Test this out.
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

ProjectModal.propTypes = {
  handleClose: func.isRequired,
  open: bool.isRequired,
  layoutId: string.isRequired,
};
