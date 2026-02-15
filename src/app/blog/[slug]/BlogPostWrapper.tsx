"use client";

import { FC } from "react";
import Link from "next/link";
import { BlogPost } from "../blogData";
import { serif } from "../../fonts";

function formatContent(content: string): string {
  // Convert markdown-like content to HTML
  let html = content
    // Headers
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n?)+/g, '<ul class="list-disc pl-6 my-4">$&</ul>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs (lines surrounded by empty lines)
    .replace(/\n\n([^<\n].*?)\n\n/g, '<p>$1</p>\n\n')
    // Wrap remaining text in paragraphs if not already wrapped
    .replace(/^([^<\n].+)$/gm, (match) => {
      if (!match.startsWith('<') && !match.startsWith('—')) {
        return `<p>${match}</p>`;
      }
      return match;
    });

  return html;
}

interface BlogPostWrapperProps {
  post: BlogPost;
}

export const BlogPostWrapper: FC<BlogPostWrapperProps> = ({ post }) => {
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

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-semibold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:my-2
            prose-blockquote:border-l-gray-600 prose-blockquote:text-gray-400
            prose-hr:border-gray-800"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
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
  );
};