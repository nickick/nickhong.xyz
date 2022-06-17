import { Inbox, LinkedIn, Twitter } from '@mui/icons-material';
import DiscordIcon from './DiscordIcon';
import TelegramIcon from './TelegramIcon';

export const socialLinks = [
  {
    text: '',
    href: 'https://twitter.com/pepperonick',
    icon: <Twitter sx={{ fontSize: 20 }} />,
  },
  {
    text: '',
    href: 'https://discord.com/users/326217372438495232',
    icon: <DiscordIcon sx={{ fontSize: 20 }} />,
  },
  {
    text: '',
    href: 'https://t.me/pepperonick',
    icon: <TelegramIcon sx={{ fontSize: 20 }} />,
  },
  {
    text: '',
    href: 'https://www.linkedin.com/in/nickhong/',
    icon: <LinkedIn sx={{ fontSize: 20 }} />,
  },
  {
    text: '',
    href: 'mailto:hong.nick+xyz@gmail.com',
    icon: <Inbox sx={{ fontSize: 20 }} />,
  },
];
