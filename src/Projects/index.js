/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */

import { Box, Typography } from '@mui/material';
import {
  motion, useSpring,
} from 'framer-motion';
import { useCallback, useState } from 'react';
import Project from './Project';
import ProjectModal from './ProjectModal';

const projects = [
  {
    name: 'FirstDayOut',
    href: 'https://firstdayout.driftershoots.com',
    description: [
      "FirstDayOut is <a href='https://twitter.com/driftershoots' target='_blank'>@driftershoots</a> Open Edition NFT mint. Celebrating the 1 year anniversary of Drift's release from wrongful incarceration, the NFT drop saw over 10,000 mints.",
      'This raised $6.7 million, with over $1 million going to support the Bail Bond Fund, making this the most commercially successful photograph in history.',
      'I was part of the technical implementation team, responsible for the ethers.js static dapp to mint.',
      'In addition, this NFT has a built-in toggle to flip between 2 image assets per NFT, a first of its kind.',
    ],
    image: '/portfolio/firstdayout.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'WMVG Migrator',
    href: 'https://wheremyvansgo.com',
    description: [
      "WMVG is <a href='https://twitter.com/driftershoots' target='_blank'>@driftershoots&apos;s</a> best known <a href='https://opensea.io/collection/where-my-vans-go' target='_blank'>NFT collection.</a> Drift started the collection in OpenSea&apos;s generic ERC-1155 Storefront contract, which has millions of NFTs from other artists.",
      "I worked with <a href='https://twitter.com/andrewhjiang' target='_blank'>@andrewhjiang</a> and <a href='https://twitter.com/ox5e5e' target='_blank'>@ox5e5e</a> to create an migrator Dapp to for @driftershoots. The dapp connects with your wallet, checks for existing WMVG in OpenSea&apos;s contract, and allows you to send that NFT to a burn address and have a new NFT minted for you on @driftershoot&apos;s own custom ERC-721 Creator Core contract.",
    ],
    image: '/portfolio/wmvg-migrator.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'NYC365',
    href: 'https://mint.nyc365.xyz',
    description: [
      "NYC365 is <a href='https://twitter.com/barrylsutton' target='_blank'>@barrylsutton&apos;s</a> 2nd NFT drop, with <a href='https://opensea.io/collection/nyc365' target='_blank'>365 1/1 photography pieces</a>.",
      'I built and launched the NFT mint Dapp, using a Next.js server and Moralis to implement a reveal-on-mint mechanic that had very low gas costs. The collection sold out within a week at 0.19E per mint.',
    ],
    image: '/portfolio/nyc365.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'Chaos & Couture',
    href: 'https://twitter.com/chaosxcouture',
    description: [
      "Chaos & Couture is <a href='https://twitter.com/itsdanataylor' target='_blank'>@itsdanataylor&apos;s</a> upcoming debut NFT drop, split into 2 individual drops that have a combination of 1/1 NFTs, edition color way NFTs, Dutch auction mechanics, and raffle mechanics.",
      'I&apos;ll be building the dapp and smart contract for these drops.',
      'More to come.',
    ],
    image: '/portfolio/chaos-couture.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
];

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
        px: 10,
        display: 'flex',
      }}
    >
      <ProjectModal
        open={!!focusedProject}
        handleClose={handleClose}
        layoutId={focusedProject}
        project={selectedProject}
      />
      <Box sx={{ flex: 2 }} />
      <Box sx={{ flex: 8 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'left',
            width: '100%',
          }}
        >
          Projects
        </Typography>
        <Typography
          variant="body"
        >
          I&apos;ve worked as a Dapp/React/Solidity engineer on
          several projects in the 1/1 NFT photography space.
        </Typography>
        <Box
          sx={{
            display: 'flex',
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
      <Box sx={{ flex: 2 }} />
    </Box>
  );
}
