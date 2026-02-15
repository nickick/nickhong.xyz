"use client";

import { useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { twMerge } from "tailwind-merge";
import { LoadedContext } from "./LoadedContext";

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
  const router = useRouter();
  const { isLoaded, markNavigation } = useContext(LoadedContext);

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

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (anchor) {
        scrollTo(e);
      } else if (href[0] === "/") {
        // Client-side navigation to a new page
        e.preventDefault();
        
        // Close drawer first
        onClose?.();
        markNavigation();
        
        // Navigate after drawer closes (300ms for animation)
        setTimeout(() => {
          router.push(href);
        }, 300);
      }
    },
    [anchor, href, scrollTo, markNavigation, onClose, router]
  );

  // Only set target for external links
  const isExternal = icon || href[0] !== "/";

  // Only animate on initial page load, not on client-side navigation
  const animationClass = isLoaded
    ? "" // No animation delay on client-side nav
    : `animate-[fadeIn_1s_both_${1 + index * 0.2}s]`;

  return (
    <Button
      as="link"
      {...(isExternal ? { target: "_blank" } : {})}
      href={href}
      onClick={handleClick}
      className={twMerge(
        `${animationClass} ${
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
