import { Container } from '@mui/material';
import Projects from '../Projects';
import Hero from './Hero';

export default function Home() {
  return (
    <Container
      sx={{
        position: 'relative',
        zIndex: 11,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Hero />
      <Projects />
    </Container>
  );
}
