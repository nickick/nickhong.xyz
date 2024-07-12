import { useEffect, useState } from "react";
import NavIcon from "@/app/NavIcon";
import useActiveSection from "@/app/hooks/useActiveSection";
import { leftNav } from "@/app/socialLinks";

export default function ActiveNav() {
  const [activeSection, setActiveSection] = useState("home");

  const { sectionInView } = useActiveSection();

  useEffect(() => {
    const onscroll = () => {
      setActiveSection(sectionInView());
    };

    window.addEventListener("scroll", onscroll);
    setActiveSection(sectionInView());

    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, [setActiveSection, sectionInView]);

  return (
    <>
      {leftNav.map(({ text, href, icon }, index) => (
        <NavIcon
          key={text + href}
          text={text}
          href={href}
          icon={icon}
          anchor={text.toLowerCase()}
          active={text === activeSection}
          index={index}
          className="mx-2 uppercase text-xs py-2"
        />
      ))}
    </>
  );
}
