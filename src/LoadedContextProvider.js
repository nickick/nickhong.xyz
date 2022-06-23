import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { entranceAnimationDelay } from './utils/animations';
import { childrenProps } from './utils/propTypes';

export const LoadedContext = createContext();

export default function LoadedProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const animationDelay = isLoaded ? 0 : entranceAnimationDelay;

  const providerValue = useMemo(() => ({
    isLoaded,
    animationDelay,
  }), [
    isLoaded,
    animationDelay,
  ]);

  return (
    <LoadedContext.Provider value={providerValue}>
      {children}
    </LoadedContext.Provider>
  );
}

LoadedProvider.propTypes = {
  children: childrenProps.isRequired,
};
