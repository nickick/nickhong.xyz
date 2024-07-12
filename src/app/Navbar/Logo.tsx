import { FC } from "react";
import { sansSerif, serif } from "../fonts";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <a
      href="/"
      className={twMerge(
        `animate-[fadeInLogo_1s_both] absolute left-1/2 transform -translate-x-1/2 translate-y-1/2`,
        className
      )}
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
  );
};

export { Logo };
