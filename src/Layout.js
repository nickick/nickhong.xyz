import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useState,
} from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const router = useRouter();

  const pageLoadStartAnimation = useCallback((url) => {
    const { pathname } = router;
    if (!url.includes(pathname)) {
      setBackgroundOpacity(0);
    }
  }, [router]);

  const animationLength = 500; // ms

  const pageLoadAnimationComplete = useCallback((url) => {
    const bgImage = '';
    // if (url.includes('/gallery')) {
    //   bgImage = '/gallery-background.jpeg';
    // }
    // if (url && url.includes('/publications')) {
    //   bgImage = '/publications-background.jpeg';
    // }

    if (url && url.includes('/privacy-policy')) {
      setOverlayOpacity(0);
    } else {
      setOverlayOpacity(1);
    }

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
          height: {
            xs: '90vh',
            md: '90vh',
          },
          background: overlayOpacity === 1
            ? 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 80%, #080808 100%)'
            : 'none',
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
          height: {
            xs: '90vh',
            md: '90vh',
          },
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
