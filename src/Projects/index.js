import { Box, Typography } from '@mui/material';
import { array, string } from 'prop-types';

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

function Project({
  name, href, description, image,
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
  );
}

Project.propTypes = {
  name: string.isRequired,
  href: string.isRequired,
  description: array.isRequired,
  image: string.isRequired,
};

export default function Projects() {
  return (
    <Box
      id="projects"
      sx={{
        width: '100%',
        px: 10,
        display: 'flex',
      }}
    >
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
            key={href}
          />
        ))}
      </Box>
      <Box sx={{ flex: 2 }} />
    </Box>
  );
}
