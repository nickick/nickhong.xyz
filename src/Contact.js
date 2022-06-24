import {
  Box, Container, Typography,
} from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useActiveSection from './hooks/useActiveSection';
import { LoadedContext } from './LoadedContextProvider';
import NavButton from './NavButton';
import { socialLinks } from './NavButton/social-links';
import { entranceAnimationDelay, entranceAnimationDuration, fadeIn } from './utils/animations';

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const [ inViewRef, inAnimationView ] = useInView({
    threshold: 0.7,
    triggerOnce: true
  })

  const { setSectionInView } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setSectionInView('Contact', 'add');
    } else {
      setSectionInView('Contact', 'delete');
    }
  }, [inView, setSectionInView]);

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      ref(node);
      inViewRef(node)
    },
    [ref, inViewRef]
  )

  const { animationDelay } = useContext(LoadedContext);

  return (
    <Container
      sx={{
        width: '100%',
        px: {
          xs: 4,
          md: 10,
        },
        pt: {
          xs: 10,
          md: 10,
        },
        display: 'flex',
        animation: inAnimationView ? `${fadeIn} ${entranceAnimationDuration}s both ${animationDelay}s` : 'none',
        opacity: 0,
      }}
      id="contact"
      ref={setRefs}
    >
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        flex: 2,
      }}
      />
      <Box
        sx={{
          flex: 8,
          borderTop: '1px solid #333',
          pt: {
            xs: 10,
            md: 10,
          },
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          flex={2}
        >
          <Typography
            variant="h2"
            sx={{
              pb: {
                xs: 2,
                md: 0,
              },
            }}
          >
            Contact
          </Typography>
        </Box>
        <Box
          flex={6}
        >
          <Typography
            variant="h3"
          >
            I&apos;m currently open to new Web3 project work and employment,
            especially from cool cats in the NFT space.
            <br />
            <br />
            If that&apos;s you, smash one of these buttons!
            <br />
            <br />
          </Typography>
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
      </Box>
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        flex: 2,
      }}
      />
    </Container>
  );
}
