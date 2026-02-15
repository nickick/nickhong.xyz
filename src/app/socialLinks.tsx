import Discord from "./icons/Discord";
import Inbox from "./icons/Inbox";
import LinkedIn from "./icons/LinkedIn";
import Telegram from "./icons/Telegram";
import X from "./icons/X";

type SocialLink = {
  text: string;
  href: string;
  icon: React.ReactNode | string;
};

export const leftNav = [
  {
    text: "Home",
    href: "/#home",
    icon: "",
  },
  {
    text: "Projects",
    href: "/#projects",
    icon: "",
  },
  {
    text: "Blog",
    href: "/blog",
    icon: "",
  },
  {
    text: "Contact",
    href: "/#contact",
    icon: "",
  },
] as SocialLink[];

export const socialLinks = [
  {
    text: "",
    href: "https://twitter.com/pepperonick",
    icon: <X />,
  },
  {
    text: "",
    href: "https://discord.com/users/326217372438495232",
    icon: <Discord />,
  },
  {
    text: "",
    href: "https://t.me/pepperonick",
    icon: <Telegram />,
  },
  {
    text: "",
    href: "https://www.linkedin.com/in/nickhong/",
    icon: <LinkedIn />,
  },
  {
    text: "",
    href: "mailto:contact@nickhong.xyz",
    icon: <Inbox />,
  },
] as SocialLink[];

export const shortSocialLinks = [
  {
    text: "",
    href: "https://twitter.com/pepperonick",
    icon: <X />,
  },
  {
    text: "",
    href: "https://discord.com/users/326217372438495232",
    icon: <Discord />,
  },
  {
    text: "",
    href: "https://t.me/pepperonick",
    icon: <Telegram />,
  },
] as SocialLink[];
