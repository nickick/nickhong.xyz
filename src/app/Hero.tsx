"use client";
import useActiveSection from "@/app/hooks/useActiveSection";
import Image from "next/image";
import { FC, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { serif } from "./fonts";
import { NavIcon } from "./NavIcon";
import { socialLinks } from "./socialLinks";

type HeroProps = {};

const heightClamp = "clamp(20rem, 60rem, 80rem)";
const mobileScreenPosition =
  "absolute h-1/2 bottom-1/2 w-full left-1/2 z-20 transform translate-x-[-50%] translate-y-[-50%]";

const Hero: FC<HeroProps> = ({}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const { setSectionInView } = useActiveSection();

  const onDownClick = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (inView) {
      setSectionInView("Home", "add");
    }
  }, [inView, setSectionInView]);

  return (
    <div
      className="flex flex-col justify-center min-h-[90hv] w-full h-[90vh]"
      ref={ref}
      id="home"
    >
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left image */}
        <div
          className="relative w-full animate-fadeInAfterDelay"
          style={{ height: heightClamp, flex: 5 }}
        >
          <div
            className="absolute w-full top-1/2 md:top-0 left-1/2 md:left-0
            transform
            translate-x-[-50%] translatey-y-[-40%]
            md:translate-x-0 md:translate-y-[10rem]
            lg:translate-x-[10rem] lg:translate-y-[20%]
            xl:translate-x-[20rem] xl:translate-y-[10rem]"
            style={{
              height: heightClamp,
            }}
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
              className="absolute h-1/2 bottom-0 w-full top-0 left-0 z-20
              transform
              opacity-0 md:opacity-100
              translate-x-[0%] translate-y-[0%]"
              style={{
                background:
                  "linear-gradient(180deg, #08080800 0%, #08080800 70%, #080808ff 100%)",
              }}
            />
            {/* Cutout */}
            <div
              className="absolute h-1/2 bottom-1/2 md:bottom-0 md:top-0 left-1/2 md:left-0 transform
              translate-x-[-50%] translate-y-[-50%]
              md:translate-x-[0%] md:translate-y-[0%]
              bg-no-repeat"
              style={{
                mask: "url(/cutout.png)",
                maskSize: "contain",
              }}
            >
              <Image
                src="/profile-image.jpeg"
                alt="Nick Hong staring off into the distance to the right"
                className="w-96 h-auto"
                width={1080}
                height={1350}
              />
            </div>
          </div>
        </div>
        {/* Right text */}
        <div
          className="absolute top-1/2 md:top-0 md:relative w-full md:h-full flex flex-col gap-6 justify-center items-center md:items-start mb-[5px] md:mb-0 z-20 animate-fadeInAfterDelay"
          style={{
            flex: 5,
          }}
        >
          <h1
            className={`text-[3rem] md:text-[4rem] leading-none ${serif.className} mb-[-1rem]`}
          >
            Hi, I&apos;m Nick 👋
          </h1>
          <div className="md:text-2xl">
            I&apos;m a Web3 engineer based in NYC.
          </div>
          <div className="flex text-white items-center">
            {socialLinks.map(({ text, href, icon }, index) => (
              <NavIcon
                text={text}
                href={href}
                icon={icon}
                index={index}
                key={href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero };