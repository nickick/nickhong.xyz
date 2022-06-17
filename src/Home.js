import {
  Box, Container, Typography, keyframes,
} from '@mui/material';
import { entranceAnimationDelay, entranceAnimationDuration } from './utils/constants';

const fadeOut = keyframes`
  100% {
    opacity: 0;
  }
  0% {
    opacity: 1;
  }
`;

export default function Home() {
  return (
    <Container
      sx={{
        position: 'relative',
        zIndex: 11,
      }}
    >
      <Box
        sx={{
        }}
      >
        <Typography
          variant="h1"
        >
          Hello
        </Typography>
        <Box
          sx={{
            height: '60vh',
            transform: 'translate(0rem, 0)',
            positoin: 'relative',
          }}
        >
          <Box
            sx={{
              mask: 'url(/cutout.png)',
              maskSize: 'contain',
              position: 'absolute',
              height: '100%',
              top: 0,
              left: 0,
            }}
          >
            <img
              src="/profile-image.jpeg"
              alt="Nick Hong staring off into the distance to the right"
              style={{
                height: '100%',
              }}
            />
          </Box>
          <Box
            sx={{
              height: '60vh',
              animation: `${fadeOut} ${entranceAnimationDuration}s both ${entranceAnimationDelay}`,
            }}
          >
            <img
              src="/profile-image.jpeg"
              alt="Nick Hong staring off into the distance to the right"
              style={{
                height: '100%',
                opacity: 0.5,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
