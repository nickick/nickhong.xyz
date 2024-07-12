import { Spin as Hamburger } from "hamburger-react";
import { leftNav, shortSocialLinks } from "@/app/socialLinks";
import NavIcon from "./NavIcon";
import { Drawer } from "./Drawer";

const navLinks = leftNav.concat(shortSocialLinks);

type MobileDrawerProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  closeDrawer: () => void;
};

export default function MobileDrawer({
  isOpen,
  setOpen,
  closeDrawer,
}: MobileDrawerProps) {
  return (
    <Drawer open={isOpen}>
      <div className="absolute top-8 left-8 z-[100]">
        <Hamburger
          toggled={isOpen}
          toggle={() => setOpen(!open)}
          direction="left"
          size={20}
        />
      </div>
      <div className="flex flex-col justify-center top-1/2 transform translate-y-1/2 gap-4">
        {navLinks.map(({ text, href, icon }, index) => (
          <NavIcon
            key={text + href}
            text={text}
            href={href}
            icon={icon}
            index={index}
            anchor={text.toLowerCase()}
            onClose={closeDrawer}
            className="bg-transparent text-center"
          />
        ))}
      </div>
    </Drawer>
  );
}
