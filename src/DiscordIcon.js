import { Box } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

export default function DiscordIcon() {
  const { selectedTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={selectedTheme === 'light' ? '/icons/discord.svg' : '/icons/discord-white.svg'}
        style={{
          width: '20px',
          marginLeft: '0',
        }}
        alt="Discord logo"
      />
    </Box>
  );
}
