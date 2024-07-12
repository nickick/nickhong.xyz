import { FC } from "react";

type ButtonProps = {
  children: React.ReactNode | null;
  as: "button" | "link";
};

const Button: FC<
  (
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
  ) &
    ButtonProps
> = ({ as, ...props }) => {
  if (as === "link") {
    const anchorProps = {
      ...props,
    } as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a {...anchorProps} />;
  } else if (as === "button") {
    const buttonProps = {
      ...props,
    } as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return <button {...buttonProps} />;
  }
};

export { Button };
