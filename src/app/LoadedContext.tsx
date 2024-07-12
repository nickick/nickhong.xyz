import { createContext, useEffect, useMemo, useState } from "react";

export const LoadedContext = createContext({});

export function LoadedProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const animationDelay = isLoaded ? 0 : 1;

  const providerValue = useMemo(
    () => ({
      isLoaded,
      animationDelay,
    }),
    [isLoaded, animationDelay]
  );

  return (
    <LoadedContext.Provider value={providerValue}>
      {children}
    </LoadedContext.Provider>
  );
}
