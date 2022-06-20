import {
  Box, Button, Container, Typography,
} from '@mui/material';
import { Spin as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import Drawer from './Drawer';
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

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box
      sx={{
        pt: {
          xs: '4rem',
          md: '6.5rem',
        },
        pb: {
          xs: 2,
        },
        px: '4rem',
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
        zIndex: {
          xs: 100,
          md: 12,
        },
        position: 'sticky',
        top: '0px',
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
            flex: 1,
            display: {
              xs: 'flex',
              md: 'none',
              animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
            },
          }}
        >

          <Hamburger toggled={isOpen} toggle={setOpen} direction="left" size={20} />
          <Drawer isOpen={isOpen} setOpen={setOpen} closeDrawer={closeDrawer} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: {
              xs: 'none',
              md: 'flex',
            },
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
            display: 'flex',
            flex: '1',
            justifyContent: 'center',
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
            display: {
              xs: 'flex',
              md: 'none',
            },
            flexDirection: 'row-reverse',
            flex: 1,
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
          }}
        >
          <NavButton
            key="twitter-mobile"
            href={socialLinks[0].href}
            icon={socialLinks[0].icon}
            index={0}
          />
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
