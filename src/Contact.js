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
        px: 10,
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 2,
        }}
      />
      <Box
        sx={{
          flex: 8,
          borderTop: '1px solid #333',
          pt: 10,
          display: 'flex',
        }}
      >
        <Box
          flex={2}
        >
          <Typography
            variant="h2"
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
      <Box
        sx={{
          flex: 2,
        }}
      />
    </Container>
  );
}
