const projects = [
  {
    name: 'FirstDayOut',
    href: 'https://firstdayout.driftershoots.com',
    description: [
      "FirstDayOut is <a href='https://twitter.com/driftershoots' target='_blank'>@driftershoots</a> Open Edition NFT mint. Celebrating the 1 year anniversary of Drift's release from wrongful incarceration, the NFT drop saw over 10,000 mints.",
      'This raised $6.7 million, with over $1 million going to support the Bail Bond Fund, making this the most commercially successful photograph in history.',
      'I was part of the technical implementation team, responsible for the ethers.js static dapp to mint.',
      'In addition, this NFT has a built-in toggle to flip between 2 image assets per NFT, a first of its kind.',
    ],
    image: '/portfolio/firstdayout.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'WMVG Migrator',
    href: 'https://wheremyvansgo.com',
    description: [
      "WMVG is <a href='https://twitter.com/driftershoots' target='_blank'>@driftershoots&apos;s</a> best known <a href='https://opensea.io/collection/where-my-vans-go' target='_blank'>NFT collection.</a> Drift started the collection in OpenSea&apos;s generic ERC-1155 Storefront contract, which has millions of NFTs from other artists.",
      "I worked with <a href='https://twitter.com/andrewhjiang' target='_blank'>@andrewhjiang</a> and <a href='https://twitter.com/ox5e5e' target='_blank'>@ox5e5e</a> to create an migrator Dapp to for @driftershoots. The dapp connects with your wallet, checks for existing WMVG in OpenSea&apos;s contract, and allows you to send that NFT to a burn address and have a new NFT minted for you on @driftershoot&apos;s own custom ERC-721 Creator Core contract.",
    ],
    image: '/portfolio/wmvg-migrator.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'NYC365',
    href: 'https://mint.nyc365.xyz',
    description: [
      "NYC365 is <a href='https://twitter.com/barrylsutton' target='_blank'>@barrylsutton&apos;s</a> 2nd NFT drop, with <a href='https://opensea.io/collection/nyc365' target='_blank'>365 1/1 photography pieces</a>.",
      'I built and launched the NFT mint Dapp, using a Next.js server and Moralis to implement a reveal-on-mint mechanic that had very low gas costs. The collection sold out within a week at 0.19E per mint.',
    ],
    image: '/portfolio/nyc365.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'Digital Diaspora',
    href: 'https://digitaldiaspora.xyz',
    description: [
      "Digital Diaspora is <a href='https://twitter.com/dianaesinclair' target='_blank'>@dianaesinclair&apos;s</a> and <a href='https://twitter.com/driftershoots' target='_blank'>@driftershoots&apos;s</a> Juneteenth event, the only Black-owned event for Juneteenth in the NYC.NFT calendar.",
      "Prominent artists include <a href='https://twitter.com/Reuel_Williams' target='_blank'>@Reuel_Williams</a>, <a href='https://twitter.com/coryvanlew' target='_blank'>@coryvanlew</a>, <a href='https://twitter.com/Ed_Balloon' target='_blank'>@ed_balloon</a>, <a href='https://twitter.com/Swopes' target='_blank'>@swopes</a>, <a href='https://twitter.com/CallMeLatashaSwopes' target='_blank'>@callmelatasha</a>, <a href='https://twitter.com/misanharriman' target='_blank'>@misanharriman</a>, and <a href='https://twitter.com/ix_shells' target='_blank'>@ix_shells</a>.",
      'I built a simple static React site and helped coordinate with artists to create Maniforld ERC-721 Creator Core contracts and auction sites for the event.',
    ],
    image: '/portfolio/digitaldiaspora.png',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
  {
    name: 'Chaos & Couture',
    href: 'https://twitter.com/chaosxcouture',
    description: [
      "Chaos & Couture is <a href='https://twitter.com/itsdanataylor' target='_blank'>@itsdanataylor&apos;s</a> upcoming debut NFT drop, split into 2 individual drops that have a combination of 1/1 NFTs, edition color way NFTs, Dutch auction mechanics, and raffle mechanics.",
      'I&apos;ll be building the dapp and smart contract for these drops.',
      'More to come.',
    ],
    image: '/portfolio/chaos-couture.jpeg',
    contributors: [
      {
        name: 'DrifterShoots',
        icon: '',
      },
    ],
  },
];

export default projects;
