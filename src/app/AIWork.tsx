import { FC } from "react";
import { FadeInSection } from "./FadeInSection";
import { serif } from "./fonts";
import { Section } from "./hooks/useActiveSection";
import { Link } from "./Link";

type AIProject = {
  name: string;
  description: string;
  gradient: string;
  link?: { href: string; label: string };
};

const aiProjects: AIProject[] = [
  {
    name: "Moltivate.ai",
    description:
      "CTO — leading engineering and building agentic AI systems from the ground up.",
    gradient: "from-indigo-500/25 via-purple-500/10 to-transparent",
    link: { href: "https://moltivate.ai", label: "Visit Moltivate" },
  },
  {
    name: "Agentic Systems & AI Services",
    description:
      "Contract AI engineering for high-profile ventures — autonomous agents, tool-using systems, and AI services running in production.",
    gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
  },
  {
    name: "Travel & Hospitality AI",
    description:
      "AI-powered travel applications and hospitality chat tools built to ship to real customers, not demos.",
    gradient: "from-emerald-500/25 via-teal-500/10 to-transparent",
  },
  {
    name: "AI-Native Ops Guides",
    description:
      "Field guides for running AI agents on your own infrastructure, including an agent-executable VPS hardening walkthrough.",
    gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
    link: { href: "/blog/vps-security-agent-guide", label: "Read the guide" },
  },
];

const AIWork: FC = ({}) => {
  return (
    <FadeInSection
      className="flex flex-col w-full max-w-screen-xl mx-auto pt-24 z-[30]"
      section={Section.Projects}
      id="ai-work"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start px-8 md:px-36">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          What I&apos;m Building
        </h2>
        <p className="flex-[3] w-full text-xl leading-relaxed">
          I build agentic AI systems and customer-facing AI products, from
          autonomous agents to production AI services.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16 px-8 md:px-36">
        {aiProjects.map((project, index) => (
          <div
            key={project.name}
            className={`flex flex-col border border-[rgba(255,255,255,0.3)] transition-shadow hover:shadow-inner animate-[fadeIn_1s_both_${
              0.6 + index * 0.15
            }s]`}
          >
            <div className={`${serif.className} p-4 text-2xl md:text-3xl`}>
              {project.name}
            </div>
            <div
              className={`flex flex-col justify-end gap-4 min-h-[12rem] p-6 bg-gradient-to-br ${project.gradient}`}
            >
              <p className="text-lg leading-relaxed text-white/80">
                {project.description}
              </p>
              {project.link ? (
                <Link href={project.link.href}>{project.link.label}</Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 md:mt-24 border-gray-700 border-b mx-8 md:mx-36" />
    </FadeInSection>
  );
};

export { AIWork };
