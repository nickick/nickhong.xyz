"use client";

import { FC, useState } from "react";
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
const CodeBlock = ({ code, language }: { code: string; language: string }) => (
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

// Component for text with tooltips
const TextWithTooltips = ({ text }: { text: string }) => {
  // Split text by tooltip terms
  const parts: Array<{ type: 'text' | 'tooltip'; content: string; explanation?: string }> = [];
  let remainingText = text;
  
  // Find all tooltip matches and split
  const tooltipEntries = Object.entries(securityTooltips);
  const allMatches: Array<{ index: number; length: number; term: string; explanation: string }> = [];
  
  tooltipEntries.forEach(([term, explanation]) => {
    let index = remainingText.indexOf(term);
    while (index !== -1) {
      allMatches.push({ index, length: term.length, term, explanation });
      index = remainingText.indexOf(term, index + 1);
    }
  });
  
  // Sort by index
  allMatches.sort((a, b) => a.index - b.index);
  
  // Remove overlapping matches
  const filteredMatches: typeof allMatches = [];
  let lastEnd = -1;
  for (const match of allMatches) {
    if (match.index >= lastEnd) {
      filteredMatches.push(match);
      lastEnd = match.index + match.length;
    }
  }
  
  // Build parts
  let currentIndex = 0;
  for (const match of filteredMatches) {
    if (match.index > currentIndex) {
      parts.push({ type: 'text', content: remainingText.slice(currentIndex, match.index) });
    }
    parts.push({ type: 'tooltip', content: match.term, explanation: match.explanation });
    currentIndex = match.index + match.length;
  }
  if (currentIndex < remainingText.length) {
    parts.push({ type: 'text', content: remainingText.slice(currentIndex) });
  }
  
  // If no tooltips found, just return text
  if (parts.length === 0) {
    parts.push({ type: 'text', content: remainingText });
  }
  
  return (
    <>
      {parts.map((part, idx) => {
        if (part.type === 'tooltip' && part.explanation) {
          return (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <span className="border-b border-dotted border-blue-400 cursor-help text-blue-300 hover:text-blue-200">
                  {part.content}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{part.explanation}</p>
              </TooltipContent>
            </Tooltip>
          );
        }
        return <span key={idx}>{part.content}</span>;
      })}
    </>
  );
};

function parseContent(content: string): Array<{ type: 'text' | 'code'; content: string; language?: string }> {
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', content: match[2].trim(), language: match[1] || 'bash' });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return parts;
}

// Process markdown to React elements
const MarkdownContent = ({ text }: { text: string }) => {
  const lines = text.split('\n');
  const elements: Array<JSX.Element> = [];
  let i = 0;
  let key = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-white mt-8 mb-3">
          <TextWithTooltips text={line.slice(4)} />
        </h3>
      );
      i++;
      continue;
    }
    
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-semibold text-white mt-12 mb-4">
          <TextWithTooltips text={line.slice(3)} />
        </h2>
      );
      i++;
      continue;
    }
    
    // Horizontal rule
    if (line === '---') {
      elements.push(<hr key={key++} className="border-gray-800 my-8" />);
      i++;
      continue;
    }
    
    // List items
    if (line.startsWith('- ')) {
      const listItems: Array<string> = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc pl-6 my-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-gray-300 my-2">
              <TextWithTooltips text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    }
    
    // Bold inline
    const boldRegex = /\*\*(.+?)\*\*/g;
    const codeRegex = /`([^`]+)`/g;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    // Paragraph
    if (line.trim()) {
      let processedLine = line;
      
      // Check if line has any formatting
      const hasFormatting = boldRegex.test(line) || codeRegex.test(line) || linkRegex.test(line);
      
      if (hasFormatting || line.match(/[A-Z]/)) {
        // Process inline formatting
        const parts: Array<JSX.Element | string> = [];
        let lastIndex = 0;
        let match;
        
        // Reset regex
        boldRegex.lastIndex = 0;
        codeRegex.lastIndex = 0;
        linkRegex.lastIndex = 0;
        
        // Find all matches
        const matches: Array<{ index: number; length: number; type: string; content: string; url?: string }> = [];
        
        while ((match = boldRegex.exec(line)) !== null) {
          matches.push({ index: match.index, length: match[0].length, type: 'bold', content: match[1] });
        }
        while ((match = codeRegex.exec(line)) !== null) {
          matches.push({ index: match.index, length: match[0].length, type: 'code', content: match[1] });
        }
        while ((match = linkRegex.exec(line)) !== null) {
          matches.push({ index: match.index, length: match[0].length, type: 'link', content: match[1], url: match[2] });
        }
        
        matches.sort((a, b) => a.index - b.index);
        
        // Remove overlaps
        const filtered: typeof matches = [];
        let end = -1;
        for (const m of matches) {
          if (m.index >= end) {
            filtered.push(m);
            end = m.index + m.length;
          }
        }
        
        // Build parts
        let current = 0;
        for (const m of filtered) {
          if (m.index > current) {
            parts.push(<TextWithTooltips key={parts.length} text={line.slice(current, m.index)} />);
          }
          if (m.type === 'bold') {
            parts.push(<strong key={parts.length} className="text-white font-semibold">{m.content}</strong>);
          } else if (m.type === 'code') {
            parts.push(<code key={parts.length} className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">{m.content}</code>);
          } else if (m.type === 'link' && m.url) {
            parts.push(
              <a key={parts.length} href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {m.content}
              </a>
            );
          }
          current = m.index + m.length;
        }
        if (current < line.length) {
          parts.push(<TextWithTooltips key={parts.length} text={line.slice(current)} />);
        }
        
        elements.push(
          <p key={key++} className="text-gray-300 leading-relaxed mb-6">
            {parts.length > 0 ? parts : <TextWithTooltips text={line} />}
          </p>
        );
      } else {
        // Plain text with tooltips
        elements.push(
          <p key={key++} className="text-gray-300 leading-relaxed mb-6">
            <TextWithTooltips text={line} />
          </p>
        );
      }
      i++;
      continue;
    }
    
    // Empty line - skip
    i++;
  }
  
  return <>{elements}</>;
};

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
              return <MarkdownContent key={index} text={part.content} />;
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
