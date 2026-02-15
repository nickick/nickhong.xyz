"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Highlight, themes } from "prism-react-renderer";
import { BlogPost } from "../blogData";
import { serif } from "../../fonts";

// Tooltip component
const Tooltip = ({ children, explanation }: { children: React.ReactNode; explanation: string }) => {
  const [show, setShow] = useState(false);
  
  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dotted border-blue-400 cursor-help text-blue-300 hover:text-blue-200"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-sm text-gray-200 rounded-lg shadow-lg border border-gray-700 w-64 z-50">
          {explanation}
        </span>
      )}
    </span>
  );
};

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

// Tooltips dictionary for common security phrases
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

function addTooltips(html: string): string {
  let result = html;
  for (const [phrase, explanation] of Object.entries(securityTooltips)) {
    // Replace the phrase with a tooltip-wrapped version, but only if not already in a tag
    const regex = new RegExp(`(?<![\\w<])(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\w>])`, 'g');
    result = result.replace(regex, `<span class="tooltip-phrase" data-explanation="${explanation}">$1</span>`);
  }
  return result;
}

function formatContent(content: string): { html: string; codeBlocks: Array<{ id: string; code: string; language: string }> } {
  const codeBlocks: Array<{ id: string; code: string; language: string }> = [];
  let blockId = 0;
  
  // Replace em-dashes with hyphens
  let processedContent = content.replace(/[\u2014]/g, '-');
  
  // Extract code blocks first
  processedContent = processedContent.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      const id = `code-block-${blockId++}`;
      codeBlocks.push({
        id,
        code: code.trim(),
        language: lang || "bash",
      });
      return `<div data-code-block="${id}"></div>`;
    }
  );
  
  // Convert markdown to HTML
  let html = processedContent
    // Headers
    .replace(/### (.+)/g, '<h3 class="text-xl font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/## (.+)/g, '<h2 class="text-2xl font-semibold text-white mt-12 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Inline code (single backticks)
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

  // Add tooltips
  html = addTooltips(html);

  return { html, codeBlocks };
}

interface BlogPostWrapperProps {
  post: BlogPost;
}

export const BlogPostWrapper: FC<BlogPostWrapperProps> = ({ post }) => {
  const { html, codeBlocks } = formatContent(post.content);
  const [tooltip, setTooltip] = useState<{ show: boolean; text: string; x: number; y: number }>({ show: false, text: '', x: 0, y: 0 });
  
  const handleMouseEnter = (e: React.MouseEvent, explanation: string) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      show: true,
      text: explanation,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };
  
  const handleMouseLeave = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };
  
  // Split HTML by code block placeholders
  const parts = html.split(/(<div data-code-block="[^"]+"><\/div>)/);
  
  return (
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

        <div className="blog-content relative">
          {parts.map((part, index) => {
            const match = part.match(/<div data-code-block="([^"]+)"><\/div>/);
            if (match) {
              const block = codeBlocks.find(b => b.id === match[1]);
              if (block) {
                return <CodeBlock key={index} code={block.code} language={block.language} />;
              }
            }
            // Process tooltip phrases
            const processedPart = part.replace(
              /<span class="tooltip-phrase" data-explanation="([^"]+)">([^<]+)<\/span>/g,
              (match, explanation, text) => {
                return `<mark class="border-b border-dotted border-blue-400 cursor-help text-blue-300 hover:text-blue-200 bg-transparent" data-tooltip="${explanation}">${text}</mark>`;
              }
            );
            return <div key={index} dangerouslySetInnerHTML={{ __html: processedPart }} />;
          })}
        </div>
      </article>

      {/* Global tooltip */}
      {tooltip.show && (
        <div 
          className="fixed px-3 py-2 bg-gray-800 text-sm text-gray-200 rounded-lg shadow-lg border border-gray-700 w-64 z-50 pointer-events-none"
          style={{ 
            left: tooltip.x - 128, 
            top: tooltip.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          {tooltip.text}
        </div>
      )}

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
  );
};
