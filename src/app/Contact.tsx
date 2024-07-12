import { FC, useCallback, useEffect } from "react";
import { serif } from "./fonts";
import { useInView } from "react-intersection-observer";
import { socialLinks } from "./socialLinks";
import NavIcon from "./NavIcon";
import useActiveSection from "./hooks/useActiveSection";

const Contact: FC = ({}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [inViewRef, inAnimationView] = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });

  const { setSectionInView } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setSectionInView("Contact", "add");
    } else {
      setSectionInView("Contact", "delete");
    }
  }, [inView, setSectionInView]);

  const setRefs = useCallback(
    (node: Element | null) => {
      ref(node);
      inViewRef(node);
    },
    [ref, inViewRef]
  );

  return (
    <div
      className={`flex flex-col w-full px-8 md:px-36 max-w-screen-xl mx-auto pt-24 opacity-0 ${
        inAnimationView ? "animate-fadeInAfterDelay" : ""
      }`}
      ref={setRefs}
      id="contact"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start">
        <h2 className={`flex-[1] ${serif.className} text-3xl`}>Contact</h2>
        <div className="flex-[3] text-xl gap-8 flex flex-col leading-relaxed">
          <p>
            I&apos;m currently open to new Web3 project work and employment,
            especially from cool cats in the NFT space.
          </p>
          <p>If that&apos;s you, smash one of these buttons!</p>
          <div className="flex text-white items-center">
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
    </div>
  );
};

export { Contact };
