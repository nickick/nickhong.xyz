"use client";

import { FC, useContext } from "react";
import Link from "next/link";
import { sansSerif, serif } from "../fonts";
import { twMerge } from "tailwind-merge";
import { LoadedContext } from "../LoadedContext";

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = ({ className }) => {
  const { isLoaded } = useContext(LoadedContext);

  // Only animate on initial load, not on client-side nav
  // When skipping animation, use the final transform from the keyframe
  const logoAnimation = isLoaded ? "" : "animate-[fadeInLogo_1s_both]";
  const logoTransform = isLoaded 
    ? "scale-100 translate-y-[5px]" // Final state from animation
    : "scale-100 translate-y-1/2"; // Initial state (will be overridden by animation)

  return (
    <Link
      href="/"
      className={twMerge(
        `${logoAnimation} absolute left-1/2 transform -translate-x-1/2 ${logoTransform}`,
        className
      )}
    >
      <div className="flex items-center">
        <div className={`${serif.className} text-3xl`}>nickhong</div>
        {[".", "x", "y", "z"].map((letter, index) => (
          <div
            key={index}
            className={`${sansSerif.className} text-2xl ${
              isLoaded ? "" : `animate-[fadeIn_1s_both_${1 + index * 0.2}s]`
            }`}
          >
            {letter}
          </div>
        ))}
      </div>
    </Link>
  );
};

export { Logo };
