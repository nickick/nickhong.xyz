"use client";

import { createContext, useEffect, useMemo, useState, useCallback } from "react";

// Global state that persists across the session (not tied to component lifecycle)
let globalHasLoaded = false;

// Key for session storage to track hard reloads
const SESSION_KEY = "nickhongxyz-session-id";

// Generate a unique session ID for this page load
function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// Check if this is a fresh page load (hard refresh or new tab)
function isFreshPageLoad(): boolean {
  if (typeof window === "undefined") return true;
  
  // Use Performance Navigation API
  const navEntries = performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[];
  
  if (navEntries.length > 0) {
    const navEntry = navEntries[0];
    // 'reload' means hard refresh - clear global state
    if (navEntry.type === "reload") {
      globalHasLoaded = false;
      return true;
    }
  }
  
  return false;
}

export const LoadedContext = createContext({
  isLoaded: false,
  markNavigation: () => {},
});

export function LoadedProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(globalHasLoaded);

  // On mount, check if we need to animate
  useEffect(() => {
    const freshLoad = isFreshPageLoad();
    
    if (freshLoad || !globalHasLoaded) {
      // First load - show animation after delay
      const timer = setTimeout(() => {
        globalHasLoaded = true;
        setIsLoaded(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Already loaded in this session - show immediately
      setIsLoaded(true);
    }
  }, []);

  // Handle anchor scroll after navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const anchorToScroll = sessionStorage.getItem("scrollToAnchor");
    if (anchorToScroll) {
      sessionStorage.removeItem("scrollToAnchor");
      // Wait for page to be fully loaded and DOM ready
      const scrollToAnchor = () => {
        const element = document.getElementById(anchorToScroll);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      
      // Try immediately and after a delay
      scrollToAnchor();
      setTimeout(scrollToAnchor, 100);
      setTimeout(scrollToAnchor, 500);
    }
  }, []); // Run once on mount

  // Mark that navigation occurred (for client-side nav)
  const markNavigation = useCallback(() => {
    globalHasLoaded = true;
    setIsLoaded(true);
  }, []);

  const providerValue = useMemo(
    () => ({
      isLoaded,
      markNavigation,
    }),
    [isLoaded, markNavigation]
  );

  return (
    <LoadedContext.Provider value={providerValue}>
      {children}
    </LoadedContext.Provider>
  );
}
