import { FC, useEffect } from "react";
import { serif } from "./fonts";
import { useInView } from "react-intersection-observer";
import useActiveSection, {
  AddOrDelete,
  Section,
} from "./hooks/useActiveSection";

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline hover:text-gray-200 transition-colors"
    >
      {children}
    </a>
  );
};

const OtherWork: FC = ({}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { setSectionInView } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setSectionInView(Section.OtherProjects, AddOrDelete.add);
    } else {
      setSectionInView(Section.OtherProjects, AddOrDelete.delete);
    }
  }, [inView, setSectionInView]);

  return (
    <div
      className="flex flex-col w-full px-8 md:px-36 max-w-screen-xl mx-auto pt-24 animate-fadeInAfterDelay"
      ref={ref}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          Other Work
        </h2>
        <div className="flex-[3] text-xl gap-8 flex flex-col leading-relaxed">
          <p>
            Before journeying into Web3, I worked for 10 years as a fullstack
            Software Engineer / Engineering Manager at several Web2 companies:{" "}
            <Link href="https://medium.com">Medium</Link> ,{" "}
            <Link href="https://eaze.com">Eaze</Link>,{" "}
            <Link href="https://instacart.com">Instacart</Link>, and{" "}
            <Link href="https://therealreal.com">TheRealReal</Link>.
          </p>
          <p>
            I&apos;m a skilled fullstack engineer, with experience in React.js,
            Solidity, Next.js, Express.js, Node.js, and Ruby on Rails.
          </p>
          <p>
            I&apos;ve also had 4 years of experience managing high performance
            engineering teams in fast-moving, high-pressure startups.
          </p>
          <p>
            For more details, take a look at my{" "}
            <Link href="https://linkedin.com/in/nickhong">Linkedin</Link>.
          </p>
        </div>
      </div>
      <div className="border-b border-gray-700 pb-24" />
    </div>
  );
};

export { OtherWork };
