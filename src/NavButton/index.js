import { Button } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import {
  entranceAnimationDelay, entranceAnimationDuration, fadeIn,
} from '../utils/animations';

export default function NavButton({
  text, href, icon, index, anchor, active,
}) {
  const scrollTo = useCallback((e) => {
    if (anchor) {
      e.preventDefault();

      document.getElementById(anchor).scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [anchor]);

  return (
    <Link href={href} passHref>
      <Button
        variant="text"
        sx={{
          color: active ? 'black' : 'text.primary',
          background: active ? '#ccc' : '#080808',
          minWidth: icon ? '1rem' : 'inherit',
          mx: '0.5rem',
          fontSize: '1.5rem',
          height: '4rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          animation: `${fadeIn} ${entranceAnimationDuration}s both ${entranceAnimationDelay + index * 0.2}s`,
        }}
        target={(icon || href[0] !== '/') ? '_blank' : ''}
        onClick={scrollTo}
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
  anchor: PropTypes.string,
  active: PropTypes.bool,
};

NavButton.defaultProps = {
  text: '',
  href: '',
  icon: null,
  anchor: '',
  active: false,
};
