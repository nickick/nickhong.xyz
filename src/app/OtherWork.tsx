import { FC } from "react";
import { FadeInSection } from "./FadeInSection";
import { serif } from "./fonts";
import { Section } from "./hooks/useActiveSection";
import { Link } from "./Link";

const OtherWork: FC = ({}) => {
  return (
    <FadeInSection
      className="flex flex-col w-full px-8 md:px-36 max-w-screen-xl mx-auto pt-24"
      id="other-work"
      section={Section.OtherProjects}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          Other Work <br className="hidden md:block" /> & Skills
        </h2>
        <div className="flex-[3] text-xl gap-8 flex flex-col leading-relaxed">
          <p>
            Before journeying into Web3, I worked for 10 years at a few Web2
            companies you might recognize:{" "}
            <Link href="https://medium.com">Medium</Link> ,{" "}
            <Link href="https://eaze.com">Eaze</Link>,{" "}
            <Link href="https://instacart.com">Instacart</Link>, and{" "}
            <Link href="https://therealreal.com">TheRealReal</Link>.
          </p>
          <p>
            I&apos;ve become a strong fullstack engineer and learned how to
            effectively build products in interdisciplinary teams through these
            companies. I self-manage well and can manage entire engineering
            teams through agile processes to integrate into broader company
            directives. My technical skills include expertise in React.js,
            Solidity, Next.js, Express.js, Node.js, AWS, and Ruby on Rails.
          </p>
          <p>
            For more details, take a look at my{" "}
            <Link href="https://linkedin.com/in/nickhong">Linkedin</Link>.
          </p>
        </div>
      </div>
      <div className="border-b border-gray-700 pb-24" />
    </FadeInSection>
  );
};

export { OtherWork };
