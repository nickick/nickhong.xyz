import type { Metadata } from "next";
import { BlogWrapper } from "./BlogWrapper";
import { BlogPostList } from "./BlogPostList";

export const metadata: Metadata = {
  title: "Blog | nickhong.xyz",
  description: "Thoughts and guides on using AI to write code better and faster.",
};

export default function BlogPage() {
  return (
    <BlogWrapper>
      <BlogPostList />
    </BlogWrapper>
  );
}
