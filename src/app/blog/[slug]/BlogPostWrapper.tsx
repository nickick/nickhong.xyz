"use client";

import { FC } from "react";
import Link from "next/link";
import { Highlight, themes } from "prism-react-renderer";
import { BlogPost } from "../blogData";
import { serif } from "../../fonts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Code block component with syntax highlighting
const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} rounded-lg p-4 my-6 overflow-x-auto text-sm font-mono`}
          style={{ ...style, background: "#1e1e1e" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              <span className="table-cell text-gray-500 text-right pr-4 select-none" style={{ minWidth: "2.5rem" }}>
                {i + 1}
              </span>
              <span className="table-cell">
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token });
                  return (
                    <span
                      key={key}
                      {...tokenProps}
                      style={{
                        ...tokenProps.style,
                        color: tokenProps.style?.color || "#d4d4d4",
                      }}
                    />
                  );
                })}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

// Tooltip wrapper for key terms
const TermTooltip = ({ term, explanation }: { term: string; explanation: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="border-b border-dotted border-blue-400 cursor-help text-blue-300 hover:text-blue-200">
        {term}
      </span>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <p>{explanation}</p>
    </TooltipContent>
  </Tooltip>
);

// Security tooltips dictionary
const securityTooltips: Record<string, string> = {
  "Never run operations as root": "Attackers constantly scan for root access. If they compromise root, they own your entire system. A non-root user limits the damage scope.",
  "SSH brute force attempts": "Bots try thousands of common username/password combinations against port 22. A custom port makes you invisible to 99% of automated scans.",
  "dark forest": "The internet is hostile by default. Any exposed service is immediately probed by bots, scanners, and attackers looking for easy targets.",
  "PasswordAuthentication no": "Passwords can be guessed or brute-forced. SSH keys are cryptographically secure and impossible to brute-force in practice.",
  "PermitRootLogin no": "Even with key auth, disabling root login prevents privilege escalation attacks where an attacker tries to become root.",
  "UFW": "Uncomplicated Firewall. Blocks all incoming connections by default, only allowing what you explicitly permit. Essential defense layer.",
  "Fail2Ban": "Watches logs for suspicious patterns (like failed logins) and automatically bans the source IP for a set time. Your automated bouncer.",
  "unattended-upgrades": "Security patches don't help if you don't install them. This automatically applies security updates so you're always protected.",
};

function parseContent(content: string): Array<{ type: 'text' | 'code'; content: string; language?: string }> {
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    // Add code block
    parts.push({ type: 'code', content: match[2].trim(), language: match[1] || 'bash' });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return parts;
}

function renderTextWithTooltips(text: string): JSX.Element {
  // First convert markdown to HTML
  let processedText = text
    // Headers
    .replace(/### (.+)/g, '<h3 class="text-xl font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/## (.+)/g, '<h2 class="text-2xl font-semibold text-white mt-12 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="border-gray-800 my-8" />')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="text-gray-300 my-2">$1</li>')
    .replace(/(<li class="text-gray-300 my-2">.+<\/li>\n?)+/g, '<ul class="list-disc pl-6 my-4">$1</ul>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>')
    // Paragraphs
    .replace(/\n\n([^\n<].*?\n?)\n\n/g, '<p class="text-gray-300 leading-relaxed mb-6">$1</p>\n\n')
    // Wrap remaining text
    .replace(/^([^<\n].+)$/gm, (match) => {
      if (!match.startsWith('<') && !match.startsWith('-')) {
        return `<p class="text-gray-300 leading-relaxed mb-6">${match}</p>`;
      }
      return match;
    });

  // Replace tooltip terms with markers
  let idCounter = 0;
  const tooltipsToRender: Array<{ id: string; term: string; explanation: string }> = [];
  
  Object.entries(securityTooltips).forEach(([term, explanation]) => {
    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    processedText = processedText.replace(regex, () => {
      const id = `tooltip-${idCounter++}`;
      tooltipsToRender.push({ id, term, explanation });
      return `<span data-tooltip-id="${id}" class="border-b border-dotted border-blue-400 cursor-help text-blue-300 hover:text-blue-200">${term}</span>`;
    });
  });

  return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
}

interface BlogPostWrapperProps {
  post: BlogPost;
}

export const BlogPostWrapper: FC<BlogPostWrapperProps> = ({ post }) => {
  const parts = parseContent(post.content);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="max-w-3xl mx-auto w-full px-4 md:px-12 pt-24 pb-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <article>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-gray-500 bg-gray-900 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className={`${serif.className} text-3xl md:text-5xl text-white mb-6`}>
            {post.title}
          </h1>

          <time className="text-sm text-gray-500 block mb-12">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div className="blog-content">
            {parts.map((part, index) => {
              if (part.type === 'code') {
                return <CodeBlock key={index} code={part.content} language={part.language || 'bash'} />;
              }
              return <div key={index}>{renderTextWithTooltips(part.content)}</div>;
            })}
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
};
