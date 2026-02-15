import { FC } from "react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode | null;
  as: "button" | "link";
  href?: string;
};

const Button: FC<
  (
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
  ) &
    ButtonProps
> = ({ as, href, children, ...props }) => {
  if (as === "link") {
    // Use Next.js Link for internal navigation (no full page reload)
    const isInternalLink = href && href.startsWith("/");

    if (isInternalLink) {
      const linkProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <Link href={href} {...linkProps}>
          {children}
        </Link>
      );
    } else {
      // External links still use regular anchor tags
      const anchorProps = {
        ...props,
        href,
      } as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return <a {...anchorProps}>{children}</a>;
    }
  } else if (as === "button") {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return <button {...buttonProps}>{children}</button>;
  }
  return null;
};

export { Button };