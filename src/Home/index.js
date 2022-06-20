import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box, Button, Container, Link, Typography,
} from '@mui/material';
import { node, number, string } from 'prop-types';
import Projects from '../Projects';
import { socialLinks } from '../social-links';
import {
  bounceUp, entranceAnimationDelay, entranceAnimationDuration, fadeIn, slideFromLeft,
} from '../utils/animations';

function HomeIcon({
  text, href, icon, index,
}) {
  return (
    <Link href={href} key={text + href} target="_blank">
      <Button
        variant="text"
        sx={{
          color: 'text.primary',
          minWidth: icon ? '1rem' : 'inherit',
          mr: '1rem',
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          animation: `${fadeIn} ${entranceAnimationDuration}s both ${(entranceAnimationDelay + 0.5) + index * 0.2}s`,
        }}
        target="_blank"
      >
        {text}
        {icon || ''}
      </Button>
    </Link>
  );
}

HomeIcon.propTypes = {
  text: string,
  href: string,
  icon: node,
  index: number.isRequired,
};

HomeIcon.defaultProps = {
  text: '',
  href: '',
  icon: null,
};

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '90vh',
          mb: 10,
          width: '100%',
          height: '100%',
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
              transform: 'translateX(20rem)',
              animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
            }}
          >
            <Box
              sx={{
                height: '60vh',
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 80%, #080808 100%)',
                  zIndex: 12,
                }}
              />
              <Box
                sx={{
                  mask: 'url(/cutout.png)',
                  maskSize: 'contain',
                  position: 'absolute',
                  height: '100%',
                  top: 0,
                  left: 0,
                  zIndex: 11,
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
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
              flex: 5,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 1,
              }}
            >
              Hi, I&apos;m Nick 👋
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
              }}
            >
              I&apos;m a Web3 engineer based in NYC.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {socialLinks.map(({ text, href, icon }, index) => (
                <HomeIcon
                  text={text}
                  href={href}
                  icon={icon}
                  index={index}
                  key={href}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              flex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              animationName: `${bounceUp}`,
              animationIterationCount: 'infinite',
              animationDuration: '2s',
              animationDirection: 'both',
              animationDelay: '3s',
            }}
          >
            <KeyboardArrowDown
              sx={{
                fontSize: 100,
                cursor: 'pointer',
                opacity: 0,
                animation: `${slideFromLeft} ${entranceAnimationDuration}s both ${entranceAnimationDelay + 1}s`,
              }}
              onClick={() => {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </Box>
        </Box>
      </Box>
      <Projects />
    </Container>
  );
}
