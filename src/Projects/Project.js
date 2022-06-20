import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { array, func, string } from 'prop-types';
import { useCallback } from 'react';

export default function Project({
  name, href, description, image, setFocusedProject,
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
              sx={{
                display: 'block',
                mb: 2,
              }}
            />
          ))}
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
  description: array.isRequired,
  image: string.isRequired,
  setFocusedProject: func.isRequired,
};
