import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { func, string } from 'prop-types';
import { useCallback } from 'react';

export default function Project({
  name, href, image, setFocusedProject,
}) {
  const onClick = useCallback(() => {
    setFocusedProject(name);
  }, [name, setFocusedProject]);

  return (
    <motion.div
      layoutId={name}
    >
      <Box
        href={href}
        key={href}
        target="_blank"
        color="#fff"
        sx={[
          {
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            width: '20vw',
            border: '1px solid rgba(255,255,255,0.3)',
            my: 3,
          },
          {
            '&:hover': {
              boxShadow: 'inset 0 0 10px 0 rgba(255,255,255,0.3)',
            },
          },
        ]}
        onClick={onClick}
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
        </Box>
        <Box
          sx={{
            flex: 2,
          }}
        >
          <img src={image} alt={name} style={{ width: '100%' }} />
        </Box>
      </Box>
    </motion.div>
  );
}

Project.propTypes = {
  name: string.isRequired,
  href: string.isRequired,
  image: string.isRequired,
  setFocusedProject: func.isRequired,
};
