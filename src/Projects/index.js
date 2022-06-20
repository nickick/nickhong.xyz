import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import Project from './Project';
import ProjectModal from './ProjectModal';

const projects = [
  {
    name: 'FirstDayOut by DrifterShoots',
    href: 'https://firstdayout.driftershoots.com',
    description: [
      "FirstDayOut is <a href='https://twitter.com/driftershoots' target='_blank'>DrifterShoot&apos;s</a> Open Edition NFT mint. Celebrating the 1 year anniversary of Drift's release from wrongful incarceration, the NFT drop saw over 10,000 mints.",
      'This raised $6.7 million, with over $1 million going to support the Bail Bond Fund, making this the most commercially successful photograph in history.',
      'I was part of the technical implementation team, responsible for the ethers.js static dapp to mint.',
      'In addition, this NFT has a built-in toggle to flip between 2 image assets per NFT, a first of its kind.',
    ],
    image: '/portfolio/firstdayout.jpeg',
  },
];

export default function Projects() {
  const [focusedProject, setFocusedProject] = useState(null);
  const selectedProject = projects.find((project) => project.name === focusedProject);

  const handleClose = useCallback(() => {
    setFocusedProject(null);
  }, []);

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
        {projects.map(({
          name, href, description, image,
        }) => (
          <Project
            name={name}
            href={href}
            description={description}
            image={image}
            setFocusedProject={setFocusedProject}
            key={href}
          />
        ))}
      </Box>
      <Box sx={{ flex: 2 }} />
    </Box>
  );
}
