import type { Metadata } from "next";
import { BlogWrapper } from "./BlogWrapper";
import { BlogPostList } from "./BlogPostList";

export const metadata: Metadata = {
  title: "Blog | nickhong.xyz",
  description: "Thoughts on Web3 development, NFT projects, and the future of decentralized technology.",
};

export default function BlogPage() {
  return (
    <BlogWrapper>
      <BlogPostList />
    </BlogWrapper>
  );
}
