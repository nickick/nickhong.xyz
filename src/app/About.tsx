import { FadeInSection } from "./FadeInSection";
import { serif } from "./fonts";
import { Section } from "./hooks/useActiveSection";
import { Link } from "./Link";

const About = () => {
  return (
    <FadeInSection
      className={`flex flex-col w-full px-8 md:px-36 max-w-screen-xl mx-auto pt-24`}
      id="about"
      section={Section.About}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 flex-[4] items-start">
        <h2
          className={`flex-[1] w-full ${serif.className} text-3xl text-center md:text-left`}
        >
          About me
        </h2>
        <div className="flex-[3] text-xl gap-8 flex flex-col leading-relaxed">
          <p>
            I&apos;m a lifelong nerd (MIT &apos;10, D&D/Rifts tabletop gamer,
            anime lover, and PC gamer), a hobbyist competitive kickboxer, and a{" "}
            <Link href="https://www.tiktok.com/@millenialnick">
              {" "}
              sporadic content creator
            </Link>{" "}
            that loves to build apps and websites. I&apos;m also currently open
            to new employment!
          </p>
          <p>
            I&apos;ve been an engineer at some companies you might recognize
            like <Link href="https://instacart.com">Instacart</Link> and{" "}
            <Link href="https://therealreal.com">TheRealReal</Link>. I&apos;ve
            also managed engineering teams in hypergrowth environments at{" "}
            <Link href="https://eaze.co">Eaze</Link> and through the craziness
            of shifting to remote work at{" "}
            <Link href="https://medium.com">Medium</Link>, . Recently, I&apos;ve
            driven $7M+ in NFT sales as a key project technical driver for
            A-list celebrities like{" "}
            <Link href="https://museumofmahomes.com">Patrick Mahomes</Link> and
            the best artists in the NFT space like{" "}
            <Link href="https://x.com/driftershoots/">DrifterShoots</Link>. One
            of those projects holds the record for the most{" "}
            <Link href="https://firstdayout.driftershoots.com/">
              commercially successful photo
            </Link>{" "}
            of all time!
          </p>
          <p>
            My current professional obsession is with UX in the crypto space - I
            am enamored with the democratization of data through publicly
            available, permissionless state machines and their implications for
            the future. We are finally turning the corner on user experiences
            that are friendly to crypto newbies, and I would love to find other
            like-minded nerds to push this frontier.
          </p>
          <p>
            I&apos;ve detailed my Web3 and other professional experiences below!
          </p>
        </div>
      </div>
      <div className="mt-16 md:mt-16 border-gray-700 border-b" />
    </FadeInSection>
  );
};

export { About };
