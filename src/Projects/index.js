/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */

import { Box, Typography } from '@mui/material';
import {
  motion, useSpring,
} from 'framer-motion';
import { useCallback, useState } from 'react';
import Project from './Project';
import ProjectModal from './ProjectModal';
import projects from './project-data';

export default function Projects() {
  const [focusedProject, setFocusedProject] = useState(null);
  const selectedProject = projects.find((project) => project.name === focusedProject);

  const rotationInitial = -5;
  const slideInitial = -16;

  const rotations = projects.map(() => useSpring(rotationInitial));
  const slides = projects.map((_, i) => useSpring(slideInitial * i));

  const handleClose = useCallback(() => {
    setFocusedProject(null);
  }, []);

  const slideProjectCard = useCallback((index, direction) => {
    slides[index].set(direction === 'right' ? 45 : -45);
  }, [slides]);

  const resetCard = useCallback((index) => {
    slides[index].set(slideInitial * index);
    rotations[index].set(rotationInitial);
  }, [slides, rotationInitial, slideInitial, rotations]);

  const focusCard = useCallback((index) => {
    slides[index].set(0);
    rotations[index].set(0);
  }, [slides, rotations]);

  const hoverchange = useCallback(({ hover, index }) => {
    if (hover) {
      projects.slice(0, index).map((a, i) => {
        slideProjectCard(i, 'left');
      });

      focusCard(index);

      projects.slice(index + 1, projects.length).map(async (a, j) => {
        slideProjectCard(index + 1 + j, 'right');
      });
    } else {
      projects.map((a, i) => {
        resetCard(i);
      });
    }
  }, [focusCard, resetCard, slideProjectCard]);

  return (
    <Box
      id="projects"
      sx={{
        width: '100%',
        px: {
          xs: 4,
          md: 10,
        },
        pt: {
          xs: 20,
          md: 10,
        },
        mb: 6,
        display: 'flex',
      }}
    >
      <ProjectModal
        open={!!focusedProject}
        handleClose={handleClose}
        layoutId={focusedProject}
        project={selectedProject}
      />
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        flex: 2 
      }} />
      <Box
        sx={{
          flex: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box
            flex={2}
          >
            <Typography
              variant="h2"
            >
              Web3 Projects
            </Typography>
          </Box>
          <Box
            flex={6}
          >
            <Typography
              variant="body"
            >
              I&apos;ve worked as a Dapp/React/Solidity engineer on
              several projects in the 1/1 NFT photography space.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            width: '100%',
            mt: 6,
          }}
        >
          {projects.map(({
            name, href, description, image,
          }, index) => (
            <motion.div
              layoutId={name}
              style={{
                width: '100%',
                cursor: 'pointer',
                x: slides[index],
                perspective: 200,
                position: 'relative',
                zIndex: 15 - index,
              }}
              onHoverStart={() => {
                hoverchange({ hover: true, index });
              }}
              onHoverEnd={() => {
                hoverchange({ hover: false, index });
              }}
              key={name}
            >
              <motion.div
                style={{
                  width: '100%',
                  rotateY: rotations[index],
                }}
              >
                <Project
                  name={name}
                  href={href}
                  description={description}
                  image={image}
                  setFocusedProject={setFocusedProject}
                  hoverchange={hoverchange}
                  index={index}
                />
              </motion.div>
            </motion.div>
          ))}
        </Box>
      </Box>
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        flex: 2 
      }} />
    </Box>
  );
}
