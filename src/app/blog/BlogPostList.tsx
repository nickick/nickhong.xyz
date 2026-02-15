"use client";

import { FC } from "react";
import Link from "next/link";
import { getAllBlogPosts } from "./blogData";
import { serif } from "../fonts";

export const BlogPostList: FC = () => {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-12 pt-24 pb-16">
      <div className="mb-16 animate-[fadeIn_1s_both_1s]">
        <h1 className={`${serif.className} text-4xl md:text-5xl text-white mb-6`}>
          Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Thoughts and guides on using AI to write code better and faster.
        </p>
      </div>

      <div className="space-y-12 animate-[fadeIn_1s_both_1.2s]">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className={`border-b border-gray-800 pb-12 last:border-b-0 animate-[fadeIn_1s_both_${1.4 + index * 0.2}s]`}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wider text-gray-500 bg-gray-900 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className={`${serif.className} text-2xl md:text-3xl text-white mb-3 group-hover:text-gray-300 transition-colors`}>
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};