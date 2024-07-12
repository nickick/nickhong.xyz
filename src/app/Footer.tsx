import { FC } from "react";
import ActiveNav from "./ActiveNav";
import { socialLinks } from "./socialLinks";
import NavIcon from "./NavIcon";
import { sansSerif, serif } from "./fonts";
import { Logo } from "./Navbar/Logo";

type FooterProps = {};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="border-t border-gray-700 py-8">
      <div className="flex relative justify-between items-center mx-auto max-w-screen-2xl px-14">
        <Logo className="relative left-16 bottom-2" />
        <div className="hidden md:block">
          <ActiveNav />
        </div>
        <div className="relative flex md:hidden items-center z-50">
          <NavIcon
            key="twitter-mobile"
            text=""
            href={socialLinks[0].href}
            icon={socialLinks[0].icon}
            index={0}
          />
        </div>
        <div className="hidden md:flex text-white gap-2 items-center flex-row-reverse  relative">
          {socialLinks.map(({ text, href, icon }, index) => (
            <NavIcon
              text={text}
              href={href}
              icon={icon}
              index={index}
              key={href}
              className="px-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Footer };
