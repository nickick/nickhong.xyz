import { FC, useCallback, useContext, useEffect } from "react";
import useActiveSection, {
  AddOrDelete,
  Section,
} from "./hooks/useActiveSection";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { LoadedContext } from "./LoadedContext";

/**
 * Wrapper section that allows scrolling to with bookmark anchors and fades in when in view.
 */
type FadeInSectionProps = {
  children?: React.ReactNode;
  className: string;
  id: string;
  section: Section;
};

const FadeInSection: FC<FadeInSectionProps> = ({
  children,
  className,
  id,
  section,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [inViewRef, inAnimationView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { setSectionInView } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setSectionInView(section, AddOrDelete.add);
    } else {
      setSectionInView(section, AddOrDelete.delete);
    }
  }, [inView, section, setSectionInView]);

  const { isLoaded } = useContext(LoadedContext);
  const animationClass = isLoaded
    ? "animate-fadeIn"
    : "animate-fadeInAfterDelay";

  const setRefs = useCallback(
    (node: Element | null) => {
      ref(node);
      inViewRef(node);
    },
    [ref, inViewRef]
  );

  return (
    <div
      className={twMerge(
        `opacity-0 ${inAnimationView ? animationClass : ""}`,
        className
      )}
      id={id}
      ref={setRefs}
    >
      {children}
    </div>
  );
};

export { FadeInSection };
