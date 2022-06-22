/* eslint-disable react/jsx-props-no-spreading */

import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  array, bool, func, object, string,
} from 'prop-types';
import { useEffect } from 'react';
import Modal from '../Modal';

function ProjectModalContents({
  name, href, description, image, imageOnLeft,
}) {
  return (
    <Box
      href={href}
      key={href}
      target="_blank"
      color="#fff"
      sx={[
        {
          textDecoration: 'none',
          display: 'flex',
          flexDirection: !imageOnLeft ? 'row' : 'row-reverse',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.3)',
          my: 3,
        },
        {
          '&:hover': {
            boxShadow: 'inset 0 0 10px 0 rgba(255,255,255,0.3)',
          },
        },
      ]}
    >
      <Box
        sx={[
          {
            p: 3,
            flex: 4,
          },
        ]}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 1,
          }}
        >
          {name}
        </Typography>
        {description.map((desc) => (
          <Typography
            dangerouslySetInnerHTML={{ __html: desc }}
            key={desc}
            variant="body"
            sx={[
              {
                display: 'block',
                mb: 2,
              },
              {
                '& > a': {
                  textDecoration: 'underline',
                },
              },
            ]}
          />
        ))}
      </Box>
      <Box
        sx={{
          flex: 2,
        }}
      >
        <motion.img
          src={image}
          alt={name}
          style={{ width: '100%' }}
          layoutId={image}
        />
      </Box>
    </Box>
  );
}

ProjectModalContents.propTypes = {
  name: string.isRequired,
  href: string.isRequired,
  description: array.isRequired,
  image: string.isRequired,
  imageOnLeft: bool.isRequired,
};

export default function ProjectModal({
  open, handleClose, layoutId, project,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);

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
            <ProjectModalContents {...project} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

ProjectModal.propTypes = {
  handleClose: func.isRequired,
  open: bool.isRequired,
  layoutId: string,
  project: object,
};

ProjectModal.defaultProps = {
  project: {},
  layoutId: null,
};
