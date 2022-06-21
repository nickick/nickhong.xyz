import { Box, Typography } from '@mui/material';
import {
  motion,
} from 'framer-motion';
import { func, number, string } from 'prop-types';
import { useCallback } from 'react';

export default function Project({
  name, href, image, setFocusedProject, index,
}) {
  const onClick = useCallback(() => {
    setFocusedProject(name);
  }, [name, setFocusedProject]);

  return (
    <Box
      href={href}
      key={href + index}
      target="_blank"
      color="#fff"
      sx={[
        {
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
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
          variant="h4"
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

Project.propTypes = {
  name: string.isRequired,
  href: string.isRequired,
  image: string.isRequired,
  setFocusedProject: func.isRequired,
  index: number.isRequired,
};
