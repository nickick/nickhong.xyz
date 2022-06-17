import {
  Box, Container, Typography,
} from '@mui/material';
import { entranceAnimationDelay, entranceAnimationDuration, fadeOut } from './utils/animations';

export default function Home() {
  return (
    <Container
      sx={{
        position: 'relative',
        zIndex: 11,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Left image */}
        <Box
          sx={{
            height: '60vh',
            position: 'relative',
            flex: 5,
          }}
        >
          <Box
            sx={{
              height: '60vh',
              position: 'absolute',
              top: 0,
              left: 0,
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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 7,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: 1,
            }}
          >
            Hey, I&apos;m Nick 👋
          </Typography>
          <Typography
            variant="h3"
          >
            I&apos;m a Web3 software engineer currently looking for work.
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
