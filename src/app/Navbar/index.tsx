"use client";
import { Spin as Hamburger } from "hamburger-react";
import { FC, useState } from "react";
import ActiveNav from "../ActiveNav";
import MobileDrawer from "../MobileDrawer";
import NavIcon from "../NavIcon";
import { socialLinks } from "../socialLinks";
import { Logo } from "./Logo";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="sticky top-0 w-full px-4 md:px-12 pt-8 z-50 max-w-screen-2xl mx-auto">
      <div className="w-full relative flex justify-between">
        <div className="md:hidden z-50 animate-fadeInAfterDelay">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            direction="left"
            size={20}
          />
        </div>
        <MobileDrawer
          isOpen={isOpen}
          setOpen={setOpen}
          closeDrawer={() => setOpen(false)}
        />
        <div className="hidden md:block relative md:top-3">
          <ActiveNav />
        </div>
        <Logo />
        <div className="relative flex md:hidden items-center z-50">
          <NavIcon
            key="twitter-mobile"
            text=""
            href={socialLinks[0].href}
            icon={socialLinks[0].icon}
            index={0}
          />
        </div>
        <div className="hidden md:flex text-white gap-2 items-center flex-row-reverse  relative md:top-3">
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

export { Navbar };
