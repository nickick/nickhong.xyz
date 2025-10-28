"use client";
import { Section } from "@/app/hooks/useActiveSection";
import Image from "next/image";
import { FC, useCallback } from "react";
import { FadeInSection } from "./FadeInSection";
import { serif } from "./fonts";
import { NavIcon } from "./NavIcon";
import { socialLinks } from "./socialLinks";

const mobileScreenPosition =
  "absolute h-96 w-96 top-1/4 left-1/2 z-20 transform translate-x-[-50%] translate-y-[-95%]";

const cutoutSize = "h-96 w-96 md:h-[30rem] md:w-[30rem]";

const Hero: FC<{}> = ({}) => {
  const onDownClick = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <FadeInSection
      className="flex flex-col justify-center min-h-[90hv] w-full max-w-screen-2xl mx-auto h-[90vh] relative"
      id="home"
      section={Section.Home}
    >
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left image */}
        <div
          className="relative w-full animate-fadeInAfterDelay"
          style={{ flex: 5 }}
        >
          <div
            className="absolute w-full top-1/2 md:top-1/2 left-1/2 md:left-0
            transform
            md:h-[60rem]
            translate-x-[-50%] translatey-y-[-40%]
            md:translate-x-[20%] md:-translate-y-1/2 lg:translate-x-[4rem] xl:translate-x-[14rem]"
          >
            {/* Mobile cutout gradient */}
            <div
              className={`${mobileScreenPosition}
              opacity-100 md:opacity-0`}
              style={{
                background:
                  "linear-gradient(180deg, #08080800 0%, #08080800 50%, #080808ff 70%)",
              }}
            />
            {/* Mobile opacity scrim */}
            <div
              className={`${mobileScreenPosition}
              opacity-30 md:opacity-0`}
              style={{
                background: "#080808",
              }}
            />
            {/* Desktop cutout gradient */}
            <div
              className={`absolute ${cutoutSize} top-0 md:top-1/2 left-0 z-20
              transform
              opacity-0 md:opacity-100
              translate-x-[0%] translate-y-[0%]
              md:-translate-y-1/2`}
              style={{
                background:
                  "linear-gradient(180deg, #08080800 0%, #08080800 70%, #080808ff 100%)",
              }}
            />
            {/* Cutout */}
            <div
              className={`absolute ${cutoutSize} left-1/2 top-0 md:left-0 md:top-1/2 transform
              -translate-x-1/2 -translate-y-[95%]
              md:translate-x-[0%] md:-translate-y-1/2`}
              style={{
                mask: "url(/cutout.png)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            >
              <div className={`relative ${cutoutSize}`}>
                <Image
                  src="/profile-image.jpeg"
                  alt="Nick Hong staring off into the distance to the right"
                  className="absolute left-0 top-0"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right text */}
        <div
          className="absolute top-1/3 md:top-0 md:relative w-full md:h-full flex flex-col gap-6 justify-center items-center md:items-start mb-[5px] md:mb-0 z-20 animate-fadeInAfterDelay"
          style={{
            flex: 5,
          }}
        >
          <h1
            className={`text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-none ${serif.className} mb-[-1rem] flex gap-2 items-center`}
          >
            Hi, I&apos;m Nick{" "}
            <div className="animate-wave text-[2rem] md:text-[3rem] md:ml-3">
              👋
            </div>
          </h1>
          <div className="md:text-2xl">
            I&apos;m a fullstack developer in Web3.
          </div>
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
        <div className="flex absolute right-1/2 md:right-1/3 lg:right-[3rem] xl:right-[12.5%] top-[60%] md:top-[70%] lg:top-1/2 -translate-y-1/2 z-[30] animate-fadeInFromLeftAfterDelay">
          <Image
            src="/icons/down-carets.svg"
            width={50}
            height={50}
            alt="Down"
            className="cursor-pointer relative z-[50] animate-bounce w-8 md:w-18 h-auto"
            onClick={onDownClick}
          />
        </div>
      </div>
    </FadeInSection>
  );
};

export { Hero };
