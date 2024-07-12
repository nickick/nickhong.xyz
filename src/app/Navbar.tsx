"use client";
import { FC } from "react";
import { sansSerif, serif } from "./fonts";
import { socialLinks } from "./socialLinks";
import NavIcon from "./NavIcon";
import ActiveNav from "./ActiveNav";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="sticky top-0 w-full px-12 pt-8">
      <div className="w-full relative flex justify-between">
        <div>
          <ActiveNav />
        </div>
        <a
          href="/"
          className="animate-[fadeInLogo_1s_both] absolute left-1/2 transform -translate-x-1/2 translate-y-1/2"
        >
          <div className="flex items-center">
            <div className={`${serif.className} text-3xl`}>nickhong</div>
            {[".", "x", "y", "z"].map((letter, index) => (
              <div
                key={index}
                className={`${
                  sansSerif.className
                } text-2xl animate-[fadeIn_1s_both_${1 + index * 0.2}s]`}
              >
                {letter}
              </div>
            ))}
          </div>
        </a>
        <div className="flex text-white gap-2 items-center flex-row-reverse">
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
