import { leftNav, shortSocialLinks } from "@/app/socialLinks";
import NavIcon from "./NavIcon";
import { Drawer } from "./Drawer";
import { useEffect, useState } from "react";
import { BodyLock } from "./BodyLock";

const navLinks = leftNav.concat(shortSocialLinks);

type MobileDrawerProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  closeDrawer: () => void;
};

export default function MobileDrawer({
  isOpen,
  closeDrawer,
}: MobileDrawerProps) {
  const [bodyLock, setBodyLock] = useState<boolean>(false);

  useEffect(() => {
    setBodyLock(isOpen);
  }, [isOpen]);
  return (
    <Drawer open={isOpen}>
      {bodyLock && <BodyLock />}
      <div className="flex flex-col justify-center top-1/2 transform translate-y-1/2 gap-4">
        {navLinks.map(({ text, href, icon }, index) => (
          <NavIcon
            key={text + href}
            text={text}
            href={href}
            icon={icon}
            index={index}
            anchor={href.includes("#") ? text.toLowerCase() : undefined}
            onClose={closeDrawer}
            className="bg-transparent text-center"
          />
        ))}
      </div>
    </Drawer>
  );
}
