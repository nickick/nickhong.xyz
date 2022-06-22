import {
  Box, Container, Typography,
} from '@mui/material';
import NavButton from './NavButton';
import { socialLinks } from './NavButton/social-links';

export default function Contact() {
  return (
    <Container
      sx={{
        width: '100%',
        px: {
          xs: 4,
          md: 10,
        },
        pt: {
          xs: 10,
          md: 10,
        },
        display: 'flex',
      }}
      id="contact"
    >
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        flex: 2,
      }}
      />
      <Box
        sx={{
          flex: 8,
          borderTop: '1px solid #333',
          pt: {
            xs: 10,
            md: 10,
          },
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
            sx={{
              pb: {
                xs: 5,
                md: 0,
              },
            }}
          >
            Contact
          </Typography>
        </Box>
        <Box
          flex={6}
        >
          <Typography
            variant="h3"
          >
            I&apos;m currently open to new Web3 project work and employment,
            especially from cool cats in the NFT space.
            <br />
            <br />
            If that&apos;s you, smash one of these buttons!
            <br />
            <br />
          </Typography>
          {
            socialLinks.map(({ text, href, icon }, index) => (
              <NavButton
                key={text + href}
                text={text}
                href={href}
                icon={icon}
                index={index}
              />
            ))
          }
        </Box>
      </Box>
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        flex: 2,
      }}
      />
    </Container>
  );
}
