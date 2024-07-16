import Link from "next/link";
import { FC } from "react";

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

const LinkWrapper: FC<LinkProps> = ({ children, href }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline opacity-90 hover:opacity-100 hover:bg-gray-300 hover:text-black px-1 -mx-1 rounded transition-all"
    >
      {children}
    </Link>
  );
};

export { LinkWrapper as Link };
