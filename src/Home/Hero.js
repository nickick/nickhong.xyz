import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box, Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useActiveSection from '../hooks/useActiveSection';
import NavButton from '../NavButton';
import { socialLinks } from '../NavButton/social-links';
import {
  bounceUp, entranceAnimationDelay, entranceAnimationDuration, fadeIn, slideFromLeft,
} from '../utils/animations';

export default function Hero() {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const { setSectionInView } = useActiveSection();

  const onDownClick = useCallback(() => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (inView) {
      setSectionInView('Home', 'add');
    }
  }, [inView, setSectionInView]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: {
          xs: '90vh',
          md: '90vh',
        },
        width: '100%',
        height: '100%',
        transform: {
          md: 'none',
        },
      }}
      ref={ref}
      id="home"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          width: '100%',
          height: '100%',
        }}
      >
        {/* Left image */}
        <Box
          sx={{
            height: 'clamp(40rem, 60rem, 80rem)',
            position: 'relative',
            flex: 5,
            animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay}s`,
          }}
        >
          <Box
            sx={{
              height: 'clamp(40rem, 60rem, 80rem)',
              position: 'absolute',
              width: '100%',
              top: {
                xs: '50%',
                md: 0,
              },
              left: {
                xs: '50%',
                md: 0,
              },
              transform: {
                xs: 'translate(-50%,-40%)',
                md: 'translate(0rem, -10rem)',
                lg: 'translate(20rem, -2rem)',
                xl: 'translate(20rem, -0rem)',
              },
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: {
                  xs: '50%',
                  md: 0,
                },
                left: {
                  xs: '50%',
                  md: 0,
                },
                transform: {
                  xs: 'translate(-50%,-50%)',
                  md: 'none',
                },
                background: {
                  xs: 'linear-gradient(180deg, #08080888 0%, #08080888 50%, #080808ff 100%)',
                  md: 'linear-gradient(180deg, #08080800 0%, #08080800 70%, #080808ff 100%)',
                },
                zIndex: 12,
              }}
            />
            <Box
              sx={{
                mask: 'url(/cutout.png)',
                maskSize: 'contain',
                position: 'absolute',
                height: '100%',
                top: {
                  xs: '50%',
                  md: 0,
                },
                left: {
                  xs: '50%',
                  md: 0,
                },
                transform: {
                  xs: 'translate(-50%,-50%)',
                  md: 'none',
                },
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
            alignItems: {
              xs: 'center',
              md: 'flex-start',
            },
            flex: 5,
            mb: {
              xs: 5,
              md: 0,
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: 1,
              fontSize: {
                xs: '5rem',
                md: '8rem',
              },
            }}
          >
            Hi, I&apos;m Nick 👋
          </Typography>
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
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
              <NavButton
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
            alignItems: {
              xs: 'center',
              md: 'flex-start',
            },
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
            onClick={onDownClick}
          />
        </Box>
      </Box>
    </Box>
  );
}
