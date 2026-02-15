export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Blog",
    excerpt: "An introduction to my new blog where I'll be sharing thoughts on Web3 development, NFT projects, and the future of decentralized technology.",
    content: `
## Hello, World!

Welcome to my new blog! I'm Nick Hong, a Web3 developer with over 4 years of experience building in the NFT and blockchain space.

### What to Expect

In this blog, I'll be sharing:

- **Technical deep dives** into smart contract development and Web3 architecture
- **Case studies** from projects I've worked on, including lessons learned
- **Industry insights** about where I think the space is heading
- **Tutorials** for developers looking to break into Web3

### My Journey So Far

I've been fortunate to work on some incredible projects with amazing artists and celebrities. From helping launch Patrick Mahomes' NFT collection to building the mint site for Driftershoots' record-breaking "First Day Out" drop, it's been a wild ride.

The Web3 space moves fast. Really fast. But that's part of what makes it exciting. Every project is an opportunity to learn something new and push the boundaries of what's possible.

### Let's Connect

I'm always interested in connecting with other developers, artists, and anyone passionate about Web3. Feel free to reach out on [Twitter](https://twitter.com/pepperonick) or [LinkedIn](https://www.linkedin.com/in/nickhong/).

Stay tuned for more posts!

— Nick
    `,
    date: "2026-02-09",
    tags: ["web3", "introduction", "nft"],
  },
  {
    slug: "building-scalable-nft-mint-sites",
    title: "Building Scalable NFT Mint Sites: Lessons from the Field",
    excerpt: "What I learned building high-traffic mint sites that handle thousands of concurrent users and millions in transaction volume.",
    content: `
## The Challenge of Scale

When you're building an NFT mint site for a high-profile drop, the stakes are high. You're dealing with:

- Thousands of concurrent users
- Time-sensitive launches
- High gas fees and network congestion
- The pressure of handling millions of dollars in transactions

### Key Lessons Learned

#### 1. Frontend Performance Matters

Users will abandon a slow site. Period. Here's what I prioritize:

- **Image optimization**: Use WebP, lazy loading, and proper sizing
- **Code splitting**: Only load what the user needs
- **Caching strategies**: Cache metadata and images aggressively
- **CDN**: Use a CDN for global asset delivery

#### 2. Smart Contract Interactions

Gas optimization is crucial. Some strategies:

- Batch transactions when possible
- Use merkle trees for allowlists
- Implement proper error handling
- Test on testnets extensively

#### 3. Infrastructure

Don't underestimate infrastructure needs:

- Use auto-scaling for your backend
- Implement rate limiting
- Monitor everything
- Have a rollback plan

### Case Study: Museum of Mahomes

The Museum of Mahomes project had an unmoveable deadline due to NFL promotional restrictions. We had less than 3 weeks to deliver a complex mint site with:

- Fiat credit card processing
- Complex minting mechanics
- Burn-to-physical functionality

The key to success was ruthless prioritization and bringing in the right help. Shoutout to [Tom Hirst](https://twitter.com/tom_hirst) for being an amazing collaborator.

### Final Thoughts

Building scalable NFT mint sites is as much about operations as it is about code. Plan for success, monitor everything, and always have a Plan B.

What challenges have you faced building Web3 applications? I'd love to hear your stories.
    `,
    date: "2026-02-08",
    tags: ["web3", "nft", "scalability", "engineering"],
  },
  {
    slug: "the-future-of-digital-ownership",
    title: "The Future of Digital Ownership",
    excerpt: "Exploring how NFTs are evolving beyond JPEGs to represent true digital ownership and unlock new creator economies.",
    content: `
## Beyond the JPEG

When most people hear "NFT," they think of expensive JPEGs. But that's like saying the internet is just for email. The technology underlying NFTs—verifiable digital ownership on a blockchain—has far broader implications.

### Where We're Headed

#### 1. Digital Identity

Your NFTs could become your digital identity:

- Proof of attendance at events
- Credentials and certifications
- Membership in communities
- Reputation systems

#### 2. Creator Economy 2.0

NFTs enable new economic models:

- Royalties that actually work
- Fractional ownership of creative works
- Programmable incentives
- Direct creator-to-fan relationships

#### 3. Real World Assets

The bridge between physical and digital:

- Real estate tokens
- Supply chain verification
- Ticketing and access control
- Intellectual property rights

### Challenges Ahead

It's not all smooth sailing. We need to solve:

- **User experience**: Web3 is still too complicated for mainstream users
- **Scalability**: Layer 2 solutions are promising but still maturing
- **Regulation**: Legal frameworks are still evolving
- **Environmental concerns**: Proof of stake helps, but perception lags

### Why I'm Optimistic

Despite the challenges, I'm bullish on NFTs because of the fundamental value proposition: true digital ownership. In a world that's increasingly digital, the ability to own, transfer, and prove ownership of digital assets is transformative.

The projects I'm most excited about are those solving real problems and creating new possibilities—not just speculating on JPEGs.

What aspects of digital ownership are you most excited about? Let's discuss!
    `,
    date: "2026-02-07",
    tags: ["web3", "nft", "digital-ownership", "future"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
