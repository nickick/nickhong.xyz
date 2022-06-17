import { Box } from '@mui/material';

export default function TelegramIcon() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/icons/telegram.png"
        style={{
          width: '20px',
          marginLeft: '0',
        }}
        alt="Telegram logo"
      />
    </Box>
  );
}
