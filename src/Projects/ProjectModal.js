/* eslint-disable react/jsx-props-no-spreading */

import { Link as LinkIcon } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import {
  array, bool, func, object, string,
} from 'prop-types';
import { useEffect } from 'react';
import Modal from '../Modal';
import { entranceAnimationDuration, fadeIn } from '../utils/animations';

function ProjectModalContents({
  name, href, description, image, imageOnLeft, contributors,
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
          flexDirection: {
            xs: 'column',
            md: !imageOnLeft ? 'row' : 'row-reverse',
          },
          width: '100%',
          border: '1px solid rgba(255,255,255,0.3)',
          my: 3,
          maxHeight: {
            xs: '80vh',
            md: '100vh',
          },
          overflow: {
            xs: 'scroll',
            md: 'unset',
          },
          mt: {
            xs: 10,
            md: 3,
          },
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
          variant="h2"
          sx={{
            mb: 1,
          }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            my: 2,
          }}
        >
          <Link
            href={href}
            target="_blank"
          >
            <LinkIcon
              sx={{
                fontSize: '5rem',
                mr: 2,
              }}
            />
          </Link>
          {contributors.map(({ link, icon }, index) => (
            <Link
              href={link}
              target="_blank"
              key={link}
              sx={{
                animation: `${fadeIn} ${entranceAnimationDuration}s both ${0.5 + 0.2 * index}s`,
              }}
            >
              <img
                src={icon}
                alt="Twitter icon of a contributor"
                style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '2rem',
                  borderRadius: '50%',
                }}
              />
            </Link>
          ))}
        </Box>
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
          height: {
            xs: '200px',
            md: 'unset',
          },
          minHeight: {
            xs: '200px',
            md: 'unset',
          },
        }}
      >
        <Box
          sx={{ 
            display: 'flex',
            width: '100%',
            height: {
              xs: '600px',
              md: '100%',
            },
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          component={motion.div}
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
  contributors: array.isRequired,
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
