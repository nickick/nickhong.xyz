import { Button } from '@mui/material';
import PropTypes, { func } from 'prop-types';
import { childrenProps } from './utils/propTypes';

export default function OutlinedButton({
  onClick, text, children, fullWidth,
}) {
  return (
    <Button
      variant="outlined"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: 0,
          borderColor: 'text.primary',
          height: '60px',
          maxWidth: fullWidth ? 'unset' : text.length * 8 + 100,
          width: fullWidth ? '100%' : 'unset',
          transition: 'max-width 0.2s ease-out',
          overflow: 'hidden',
          color: 'white',
          px: 5,
        },
        {
          '&:hover': {
            border: '1px solid white',
          },
        },
        {
          '&:hover > span, &:hover > h4': {
            color: 'black',
            zIndex: 10,
          },
        },
        {
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '0',
            top: '0',
            backgroundColor: 'white',
            transform: 'translate(-100%, 0)',
            transformOrigin: 'left',
            transition: '0.2s transform ease-out',
            willChange: 'transform',
          },
        },
        {
          '&:hover::before': {
            transform: 'translate(0, 0)',
          },
        },
      ]}
      onClick={onClick}
    >
      { children }
    </Button>
  );
}

OutlinedButton.propTypes = {
  onClick: func.isRequired,
  text: PropTypes.string,
  fullWidth: PropTypes.bool,
  children: childrenProps.isRequired,
};

OutlinedButton.defaultProps = {
  text: '',
  fullWidth: false,
};
