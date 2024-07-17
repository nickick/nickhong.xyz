import { FC } from "react";
import { FadeInSection } from "./FadeInSection";
import NavIcon from "./NavIcon";
import { serif } from "./fonts";
import { Section } from "./hooks/useActiveSection";
import { socialLinks } from "./socialLinks";

const Contact: FC = ({}) => {
  return (
    <FadeInSection
      className={`flex flex-col w-full px-8 md:px-36 max-w-screen-xl mx-auto pt-24`}
      section={Section.Contact}
      id="contact"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          Contact
        </h2>
        <div className="flex-[3] text-xl gap-8 flex flex-col leading-relaxed">
          <p>I&apos;m currently open to new project work and employment.</p>
          <p>Contact me anywhere below!</p>
          <div className="flex text-white justify-center md:justify-start mt-8 md:mt-0">
            {socialLinks.map(({ text, href, icon }, index) => {
              return (
                <NavIcon
                  text={text}
                  href={href}
                  icon={icon}
                  index={index}
                  key={href}
                  className={index === 0 ? "md:pl-0 md:ml-0" : ""}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="pb-24" />
    </FadeInSection>
  );
};

export { Contact };
