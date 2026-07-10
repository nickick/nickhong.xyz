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
                Building agentic systems and AI services for high-profile
                ventures, and CTO at{" "}
                <Link href="https://moltivate.ai">Moltivate.ai</Link>
              </li>
              <li className="ml-4">
                Shipped revenue-generating products exceeding $7M under
                immovable deadlines, including celebrity launches like{" "}
                <Link href="https://x.com/museumofmahomes?lang=en">
                  Patrick Mahomes&apos; Museum of Mahomes
                </Link>{" "}
                and{" "}
                <Link href="https://firstdayout.driftershoots.com/">
                  DrifterShoots&apos; FirstDayOut
                </Link>{" "}
                &mdash; the most{" "}
                <Link href="https://hypebeast.com/2022/4/drift-first-day-out-jail-nft-sale">
                  commercially successful photograph
                </Link>{" "}
                in history ($6.8M raised in 24 hours)
              </li>
              <li className="ml-4">
                Senior Engineer at <Link href="https://privy.io">Privy</Link>{" "}
                and{" "}
                <Link href="https://originprotocol.com">Origin Protocol</Link>,
                building frontend infra and products serving 100M+ users
              </li>
              <li className="ml-4">
                Led engineering teams at{" "}
                <Link href="https://medium.com">Medium</Link> (Creator Partner
                Program, $20M+ in payouts) and{" "}
                <Link href="https://eaze.co">Eaze</Link> through{" "}
                <Link href="https://techcrunch.com/2021/08/19/eaze-to-become-americas-largest-cannabis-delivery-service-after-buying-green-dragon/">
                  hypergrowth
                </Link>{" "}
                (12 employees to 200+)
              </li>
              <li className="ml-4">
                Earlier, built and shipped at{" "}
                <Link href="https://instacart.com">Instacart</Link> and{" "}
                <Link href="https://therealreal.com">TheRealReal</Link>
              </li>
            </ul>
          </div>
          <p>
            My current obsession is agentic AI &mdash; building systems that can
            reason, use tools, and take real action on behalf of the people who
            use them. We&apos;re at the very beginning of what these systems can
            do, and I want to build the products that make them genuinely
            useful. I&apos;d love to find other like-minded nerds to push this
            frontier.
          </p>
          <p>I&apos;ve detailed my work below!</p>
        </div>
      </div>
      <div className="mt-16 md:mt-16 border-gray-700 border-b" />
    </FadeInSection>
  );
};

export { About };
