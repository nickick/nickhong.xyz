import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useState,
} from 'react';
import Animation from './Animation';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const router = useRouter();

  const pageLoadStartAnimation = useCallback((url) => {
    const { pathname } = router;
    if (!url.includes(pathname)) {
      setBackgroundOpacity(0);
    }
  }, [router]);

  const animationLength = 500; // ms

  const pageLoadAnimationComplete = useCallback(() => {
    const bgImage = '';
    // if (url.includes('/gallery')) {
    //   bgImage = '/gallery-background.jpeg';
    // }
    // if (url && url.includes('/publications')) {
    //   bgImage = '/publications-background.jpeg';
    // }

    setTimeout(() => {
      setBackgroundImage(bgImage);
      setBackgroundOpacity(1);
    }, animationLength);
  }, []);

  useEffect(() => {
    pageLoadAnimationComplete(router.pathname);

    router.events.on('routeChangeStart', pageLoadStartAnimation);
    router.events.on('routeChangeComplete', pageLoadAnimationComplete);
    router.events.on('routeChangeError', pageLoadAnimationComplete);

    return () => {
      router.events.off('routeChangeStart', pageLoadStartAnimation);
      router.events.off('routeChangeComplete', pageLoadAnimationComplete);
      router.events.off('routeChangeError', pageLoadAnimationComplete);
    };
  }, [pageLoadStartAnimation, pageLoadAnimationComplete, router.events, router.pathname]);

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '90vh',
          backgroundSize: 'cover',
          transition: `opacity ${animationLength}ms ease-out`,
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '90vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: backgroundOpacity,
          transition: `opacity ${animationLength}ms ease-out`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: {
            xs: 'inherit',
            md: '100%',
          },
          scroll: 'auto',
        }}
      >
        <Navbar />
        {children}
        <Footer />
        <Animation />
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
