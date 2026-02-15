"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const anchorToScroll = sessionStorage.getItem("scrollToAnchor");
    if (anchorToScroll) {
      sessionStorage.removeItem("scrollToAnchor");
      
      const scrollToAnchor = () => {
        const element = document.getElementById(anchorToScroll);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      
      // Try multiple times to ensure DOM is ready
      setTimeout(scrollToAnchor, 100);
      setTimeout(scrollToAnchor, 300);
      setTimeout(scrollToAnchor, 600);
    }
  }, [pathname]);

  return null;
}
