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
            I&apos;m a lifelong nerd (MIT &apos;10, PC gamer, D&D/Rifts tabletop
            gamer, and anime lover), a hobbyist competitive{" "}
            <Link href="https://tiktok.com/@millenialnickpov/video/7146271986208001323?_t=ZT-90un5JRYfl8&_r=1">
              Muay Thai fighter
            </Link>
            , and a{" "}
            <Link href="https://www.tiktok.com/@millenialnickpov">
              {" "}
              sporadic content creator
            </Link>{" "}
            that loves to build apps and websites.
          </p>
          <div>
            <p>Some highlights of my career:</p>
            <ul className="list-disc">
              <li className="ml-4">
                $7M+ in revenue as a Web3 owner on several NFT projects for
                A-list celebrities like{" "}
                <Link href="https://x.com/museumofmahomes?lang=en">
                  Patrick Mahomes
                </Link>{" "}
                and the best artists in the NFT space like{" "}
                <Link href="https://www.instagram.com/driftershoots/?hl=en">
                  DrifterShoots
                </Link>
              </li>
              <li className="ml-4">
                Key driver for{" "}
                <Link href="https://firstdayout.driftershoots.com/">
                  FirstDayOut
                </Link>
                , a historic NFT project that made for the most{" "}
                <Link href="https://hypebeast.com/2022/4/drift-first-day-out-jail-nft-sale">
                  commercially successful photo
                </Link>{" "}
                of all time ($6.8M raised in 24 hours!)
              </li>
              <li className="ml-4">
                Senior Web3 Engineer at{" "}
                <Link href="https://privy.io">Privy</Link> and{" "}
                <Link href="https://originprotocol.com">Origin Protocol</Link>,
                building Web3 frontend infra and products
              </li>
              <li className="ml-4">
                Managed engineering teams at{" "}
                <Link href="https://eaze.co">Eaze</Link> through{" "}
                <Link href="https://techcrunch.com/2021/08/19/eaze-to-become-americas-largest-cannabis-delivery-service-after-buying-green-dragon/">
                  hypergrowth
                </Link>{" "}
                (12 employees to 200+)
              </li>
              <li className="ml-4">
                Managed engineering teams at{" "}
                <Link href="https://medium.com">Medium</Link> through COVID-19
                remote transition
              </li>
              <li className="ml-4">
                Worked at some companies you might recognize like{" "}
                <Link href="https://instacart.com">Instacart</Link>, and{" "}
                <Link href="https://therealreal.com">TheRealReal</Link>
              </li>
            </ul>
          </div>
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
