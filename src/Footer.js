import { Container, Typography } from '@mui/material';
import { useContext } from 'react';
import { LoadedContext } from './LoadedContextProvider';
import { entranceAnimationDuration, fadeFromBelow } from './utils/animations';

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
      <Typography
        variant="h1"
      >
        Footer
      </Typography>
    </Container>
  );
}
