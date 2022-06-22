import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box, Typography,
} from '@mui/material';
import NavButton from '../NavButton';
import { socialLinks } from '../NavButton/social-links';
import {
  bounceUp, entranceAnimationDelay, entranceAnimationDuration, fadeIn, slideFromLeft,
} from '../utils/animations';

export default function Hero() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: {
          xs: '90vh',
        },
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
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
                xs: 'translate(-50%,-50%)',
                md: 'translate(0rem, -10rem)',
                lg: 'translate(20rem, -2rem)',
                xl: 'translate(0rem, -20rem)',
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
                  xs: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 80%, #080808 100%)',
                  md: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 80%, #080808 100%)',
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
              }
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
              }
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
            onClick={() => {
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
