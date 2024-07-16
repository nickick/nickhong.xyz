import { useCallback } from "react";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";

type NavIconProps = {
  text: string;
  href: string;
  icon: React.ReactNode;
  index: number;
  anchor?: string;
  active?: boolean;
  className?: string;
  onClose?: () => void;
};

export default function NavIcon({
  text,
  href,
  icon,
  index,
  anchor,
  active,
  className,
  onClose,
}: NavIconProps) {
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (anchor) {
        e.preventDefault();

        document.getElementById(anchor)?.scrollIntoView({
          behavior: "smooth",
        });

        onClose?.();
      }
    },
    [anchor, onClose]
  );

  return (
    <Button
      as="link"
      target={icon || href[0] !== "/" ? "_blank" : ""}
      href={href}
      onClick={scrollTo}
      className={twMerge(
        `animate-[fadeIn_1s_both_${1 + index * 0.2}s] ${
          active ? "text-black" : "text-white"
        } ${
          active ? "bg-gray-300" : "bg-transparent"
        } mx-2 tracking-widest rounded px-2 py-1`,
        className
      )}
    >
      {text}
      {icon || ""}
    </Button>
  );
}

export { NavIcon };
