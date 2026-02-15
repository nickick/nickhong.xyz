"use client";

import { useCallback, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const { isLoaded, markNavigation } = useContext(LoadedContext);

  const scrollToAnchor = useCallback(
    (anchorId: string) => {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
      onClose?.();
    },
    [onClose]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // External links - let them work normally
      const isExternal = icon || href[0] !== "/";
      if (isExternal) {
        return; // Let default behavior happen
      }

      // Parse href to get path and hash
      const [path, hash] = href.split("#");
      const isSamePage = path === pathname || (path === "/" && pathname === "/");

      if (isSamePage && hash) {
        // Same page anchor scroll
        e.preventDefault();
        scrollToAnchor(hash);
      } else if (!isSamePage && hash) {
        // Different page with anchor - navigate then scroll
        e.preventDefault();
        onClose?.();
        markNavigation();
        
        // Store anchor to scroll after navigation
        sessionStorage.setItem("scrollToAnchor", hash);
        
        // Navigate immediately
        router.push(path || "/");
      } else if (!isSamePage) {
        // Different page, no anchor
        e.preventDefault();
        onClose?.();
        markNavigation();
        
        // Navigate immediately
        router.push(href);
      }
      // If same page and no hash, let default behavior (reload)
    },
    [href, pathname, icon, scrollToAnchor, markNavigation, onClose, router]
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
