import {
  Box, Button, Drawer,
} from '@mui/material';
import { Spin as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { leftNav, shortSocialLinks } from './NavButton/social-links';
import { entranceAnimationDuration, fadeIn } from './utils/animations';

const navLinks = leftNav.concat(shortSocialLinks);

function NavButton({
  text, href, icon, index, onClose,
}) {
  return (
    <Link href={href} passHref>
      <Button
        variant="text"
        sx={{
          color: 'text.primary',
          minWidth: icon ? '1rem' : 'inherit',
          my: '0.5rem',
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          animation: `${fadeIn} ${entranceAnimationDuration}s both ${index * 0.1}s`,
        }}
        onClick={onClose}
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
  onClose: PropTypes.func.isRequired,
};

NavButton.defaultProps = {
  text: '',
  href: '',
  icon: null,
};

export default function MobileDrawer({ isOpen, setOpen, closeDrawer }) {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          p: 4,
          width: '90vw',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: '4rem',
          top: '4rem',
        }}
      >
        <Hamburger toggled={isOpen} toggle={setOpen} direction="left" size={20} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {navLinks.map(({ text, href, icon }, index) => (
          <NavButton
            key={text + href}
            text={text}
            href={href}
            icon={icon}
            index={index}
            onClose={closeDrawer}
          />
        ))}
      </Box>
    </Drawer>
  );
}

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};
