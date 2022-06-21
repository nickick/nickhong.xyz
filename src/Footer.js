import {
  Box, Button, Container, Typography,
} from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { socialLinks } from './social-links';
import {
  entranceAnimationDelay, entranceAnimationDuration, fadeIn, fadeInLogo,
} from './utils/animations';

function NavButton({
  text, href, icon, index,
}) {
  return (
    <Link href={href} passHref>
      <Button
        variant="text"
        sx={{
          color: 'text.primary',
          minWidth: icon ? '1rem' : 'inherit',
          mx: '0.5rem',
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay + index * 0.2}s`,
        }}
        target={(icon || href[0] !== '/') ? '_blank' : ''}
      >
        {text}
        {icon || ''}
      </Button>
    </Link>
  );
}

NavButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  index: PropTypes.number.isRequired,
};

NavButton.defaultProps = {
  text: '',
  href: '',
  icon: null,
};

const leftNav = [
  {
    text: 'Home',
    href: '/',
    icon: '',
  },
  {
    text: 'Projects',
    href: '/#projects',
    icon: '',
  },
  {
    text: 'Contact',
    href: '/#contact',
    icon: '',
  },
];

export default function Footer() {
  return (
    <Box
      sx={{
        pt: {
          xs: '14rem',
          md: '16.5rem',
        },
        pb: {
          xs: 2,
        },
        px: '4rem',
        zIndex: 11,
        position: 'relative',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '1400px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            alignItems: 'center',
            animation: `${fadeInLogo} ${entranceAnimationDuration}s both`,
            zIndex: 15,
          }}
        >
          <Link href="/">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography
                variant="h2"
              >
                nickhong
              </Typography>
              {
                ['.', 'x', 'y', 'z'].map((letter, index) => (
                  <Typography
                    variant="h3"
                    key={letter}
                    sx={{
                      animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay + index * 0.2}s`,
                    }}
                  >
                    {letter}
                  </Typography>
                ))
              }
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {
            leftNav.map(({ text, href, icon }, index) => (
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
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            flexDirection: 'row-reverse',
            flex: 1,
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
          }}
        >
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
      </Container>
    </Box>
  );
}
