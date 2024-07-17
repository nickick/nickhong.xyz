export type Project = {
  name: string;
  href: string;
  description: string[];
  image: string;
  contributors: (
    | {
        link: string;
        icon: string;
        name?: undefined;
      }
    | {
        name: string;
        icon: string;
        link?: undefined;
      }
  )[];
  imageOnLeft: boolean;
};

export const projects: Project[] = [
  {
    name: "Museum of Mahomes",
    href: "https://museumofmahomes.com",
    description: [
      "Museum of Mahomes is <a href='https://twitter.com/patrickmahomes' target='_blank' class='underline'>@patrickmahomes</a>&apos;s official NFT collection.",
      "This project was an incredible challenge. It involved complex minting mechanics, fiat credit card processing, a burn-to-physical shipment component, and an incredibly tight deadline.",
      "I was brought on to rescue the project and make the entire mint site to use <a href='https://x.com/0xfoobar' target='_blank' class='underline'>0xfoobar</a>'s smart contract work, in less than 3 weeks, with an unmoveable deadline enforced by NFL promotional bans.",
      "In that time, I brought on another amazing contractor, <a href='https://x.com/tom_hirst' target='_blank' class='underline'>Tom Hirst</a>, and managed to deliver on a beautiful, fully functional mint <a href='https://museumofmahomes.com' target='_blank' class='underline'>site</a>.",
      "A quote from the client, after Tom and I jumped in to save the project: 'Omg. I haven't been able to sleep for 3 days straight. I'm finally going to be able to get some tonight.'",
    ],
    image: "/portfolio/museumofmahomes.webp",
    contributors: [
      {
        link: "https://twitter.com/patrickmahomes",
        icon: "/portfolio/patrickmahomes.jpg",
      },
      {
        link: "https://x.com/0xfoobar",
        icon: "/portfolio/foobar.jpg",
      },
      {
        link: "https://twitter.com/tom_hirst",
        icon: "/portfolio/tomhirst.jpg",
      },
      {
        link: "https://twitter.com/sneakerdad_",
        icon: "/portfolio/sneakerdad.png",
      },
    ],
    imageOnLeft: false,
  },
  {
    name: "FirstDayOut",
    href: "https://firstdayout.driftershoots.com",
    description: [
      "FirstDayOut is <a href='https://twitter.com/driftershoots' target='_blank' class='underline'>@driftershoots</a>&apos;s Open Edition NFT mint. Celebrating the 1 year anniversary of Drift's release from wrongful incarceration, the NFT drop saw over 10,000 mints.",
      "I was part of the technical implementation team, responsible for the ethers.js conneted Dapp to mint. <a href='https://twitter.com/andrewjiang' target='_blank' class='underline'>@andrewjiang</a> wrote the smart contract, and <a href='https://twitter.com/jeffreyraefan' target='_blank' class='underline'>@jeffreyraefan</a> came up with the day to night site design.",
      "In 24 hours, we raised $6.7 million, with over $1 million going to support the Bail Bond Fund, making this the most commercially successful photograph in history.",
    ],
    image: "/portfolio/firstdayout.jpeg",
    contributors: [
      {
        link: "https://twitter.com/driftershoots",
        icon: "/portfolio/driftershoots.png",
      },
      {
        link: "https://twitter.com/andrewjiang",
        icon: "/portfolio/andrewjiang.jpeg",
      },
      {
        link: "https://twitter.com/jeffreyraefan",
        icon: "/portfolio/jeffreyraefan.jpeg",
      },
      {
        link: "https://twitter.com/sneakerdad_",
        icon: "/portfolio/sneakerdad.png",
      },
    ],
    imageOnLeft: false,
  },
  {
    name: "Signs of the Times",
    href: "https://www.signs-of-the-times.xyz/",
    description: [
      "Signs of the Times is a NFT collection featuring work from <a href='https://x.com/imbrendannorth' target='_blank' class='underline'>@brendannorth</a>.",
      "We created an NFT collection that had 2 different possible mints, representing a vote for the future of the NFT space.",
      "I wrote the Solidity smart contract. I also got to bring to life <a href='https://x.com/imbrendannorth' target='_blank' class='underline'>Jeffrey Fan</a>'s incredible site design that displays the mint vote mechanic so well.",
    ],
    image: "/portfolio/the-beginning-is-near.jpg",
    contributors: [
      {
        link: "https://twitter.com/imbrendannorth",
        icon: "/portfolio/brendannorth.jpg",
      },
      {
        link: "https://twitter.com/jeffreyraefan",
        icon: "/portfolio/jeffreyraefan.jpeg",
      },
    ],
    imageOnLeft: false,
  },
  {
    name: "WMVG Migrator",
    href: "https://wheremyvansgo.com",
    description: [
      "WMVG is <a href='https://twitter.com/driftershoots' target='_blank' class='underline'>@driftershoots&apos;s</a> best known <a href='https://opensea.io/collection/where-my-vans-go' target='_blank' class='underline'>NFT collection.</a> Drift started the collection in OpenSea&apos;s generic ERC-1155 Storefront contract, which has millions of NFTs from other artists.",
      "I worked with <a href='https://twitter.com/andrewjiang' target='_blank' class='underline'>@andrewjiang</a> and <a href='https://twitter.com/0x5e5e' target='_blank' class='underline'>@0x5e5e</a> to create an migrator Dapp for Drift. The dapp connects with your wallet, checks for existing WMVG in OpenSea&apos;s contract, and allows you to send that NFT to a burn address and have a new NFT minted for you on Drift&apos;s own custom ERC-721 Creator Core contract.",
    ],
    image: "/portfolio/wmvg-migrator.jpeg",
    contributors: [
      {
        link: "https://twitter.com/driftershoots",
        icon: "/portfolio/driftershoots.png",
      },
      {
        link: "https://twitter.com/andrewjiang",
        icon: "/portfolio/andrewjiang.jpeg",
      },
      {
        link: "https://twitter.com/0x5e5e",
        icon: "/portfolio/0x5e5e.jpeg",
      },
    ],
    imageOnLeft: false,
  },
  {
    name: "NYC365",
    href: "https://mint.nyc365.xyz",
    description: [
      "NYC365 is <a href='https://twitter.com/barrylsutton' target='_blank' class='underline'>@barrylsutton&apos;s</a> 2nd NFT drop, with <a href='https://opensea.io/collection/nyc365' target='_blank' class='underline'>365 1/1 photography pieces</a>.",
      "I built and launched the NFT mint Dapp, using a Next.js server and Moralis to implement a reveal-on-mint mechanic that had very low gas costs. The collection sold out within a week at 0.19E per mint.",
    ],
    image: "/portfolio/nyc365.jpeg",
    contributors: [
      {
        link: "https://twitter.com/barrylsutton/",
        icon: "/portfolio/barrylsutton.jpeg",
      },
      {
        link: "https://twitter.com/andrewjiang",
        icon: "/portfolio/andrewjiang.jpeg",
      },
      {
        link: "https://twitter.com/jeffreyraefan",
        icon: "/portfolio/jeffreyraefan.jpeg",
      },
    ],
    imageOnLeft: false,
  },
  {
    name: "Digital Diaspora",
    href: "https://digitaldiaspora.xyz",
    description: [
      "Digital Diaspora is <a href='https://twitter.com/dianaesinclair' target='_blank' class='underline'>@dianaesinclair&apos;s</a> and <a class='underline' href='https://twitter.com/driftershoots' target='_blank'>@driftershoots&apos;s</a> Juneteenth event, the only Black-owned event for Juneteenth in the NYC.NFT calendar.",
      "Prominent artists include <a href='https://twitter.com/Reuel_Williams' target='_blank' class='underline'>@Reuel_Williams</a>, <a class='underline' href='https://twitter.com/coryvanlew' target='_blank'>@coryvanlew</a>, <a class='underline' href='https://twitter.com/Ed_Balloon' target='_blank'>@ed_balloon</a>, <a class='underline' href='https://twitter.com/Swopes' target='_blank'>@swopes</a>, <a class='underline' href='https://twitter.com/CallMeLatasha' target='_blank'>@callmelatasha</a>, <a class='underline' href='https://twitter.com/misanharriman' target='_blank'>@misanharriman</a>, and <a class='underline' href='https://twitter.com/ix_shells' target='_blank'>@ix_shells</a>.",
      "I built a simple static React site and helped coordinate with artists to create Maniforld ERC-721 Creator Core contracts and auction sites for the event.",
    ],
    image: "/portfolio/digitaldiaspora.png",
    contributors: [
      {
        link: "https://twitter.com/dianaesinclair",
        icon: "/portfolio/dianaesinclair.jpeg",
      },
      {
        link: "https://twitter.com/driftershoots",
        icon: "/portfolio/driftershoots.png",
      },
      {
        link: "https://twitter.com/andrewjiang",
        icon: "/portfolio/andrewjiang.jpeg",
      },
      {
        name: "https://twitter.com/sneakerdad_",
        icon: "/portfolio/sneakerdad.png",
      },
    ],
    imageOnLeft: true,
  },
  {
    name: "Chaos & Couture",
    href: "https://twitter.com/chaosxcouture",
    description: [
      "Chaos & Couture is <a href='https://twitter.com/itsdanataylor' target='_blank' class='underline'>@itsdanataylor&apos;s</a> debut NFT drop, split into 2 individual drops that have a combination of 1/1 NFTs, edition color way NFTs, Dutch auction mechanics, and raffle mechanics.",
      "I built the dapp and smart contract for these drops. The drop had complex minting mechanisms that required a mix of NFT images organized by attributes. I also programmatically set up delayed reveals using Arweave.",
    ],
    image: "/portfolio/chaos-couture.jpeg",
    contributors: [
      {
        link: "https://twitter.com/itsdanataylor",
        icon: "/portfolio/itsdanataylor.jpeg",
      },
      {
        link: "https://twitter.com/andrewjiang",
        icon: "/portfolio/andrewjiang.jpeg",
      },
    ],
    imageOnLeft: true,
  },
];
