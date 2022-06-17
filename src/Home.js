import { Box, Container, Typography } from '@mui/material';

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
            transform: 'translate(-30rem, 0)',
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
          <img
            src="/profile-image.jpeg"
            alt="Nick Hong staring off into the distance to the right"
            style={{
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
