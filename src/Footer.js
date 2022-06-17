import {
  Box, Container, keyframes, Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';
import { entranceAnimationDuration } from './utils/constants';
import { LoadedContext } from './LoadedContextProvider';

const fadeFromBelow = keyframes`
  0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
`;

const sitemapLinks = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'Publications',
    link: '/publications',
  },
  {
    text: 'Gallery',
    link: '/gallery',
  },
  {
    text: 'About',
    link: '/about',
  },
  {
    text: 'Contact',
    link: '/contact',
  },
];

export default function Footer() {
  const { animationDelay } = useContext(LoadedContext);

  return (
    <Container
      sx={{
        maxWidth: '1440px',
        p: 4,
        animation: `${fadeFromBelow} ${entranceAnimationDuration}s both ${1 + animationDelay}s`,
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
          }}
        >
          <Typography
            variant="h3"
          >
            To the moon and never back.
          </Typography>
          <Typography
            variant="overline"
          >
            Email
          </Typography>
          <Typography
            variant="body"
          >
            <NextLink
              href="mailto: driftershoots@gmail.com"
            >
              driftershoots@gmail.com
            </NextLink>
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              mt: {
                xs: 1,
                md: 0,
              },
            }}
          >
            Sitemap
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
            }}
          >
            {
              sitemapLinks.map(({ text, link }) => (
                <Typography
                  variant="body"
                  key={text}
                  sx={{
                    m: 0.5,
                  }}
                >
                  <NextLink
                    href={link}
                  >
                    {text}
                  </NextLink>
                </Typography>
              ))
            }
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Typography
            variant="overline"
          >
            <NextLink
              href="/privacy-policy"
            >
              Privacy Policy
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
