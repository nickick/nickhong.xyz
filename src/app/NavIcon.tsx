import Link from "next/link";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Button } from "./Button";

type NavButtonProps = {
  text: string;
  href: string;
  icon: React.ReactNode;
  index: number;
  anchor: string;
  active: boolean;
};

export default function NavButton({
  text,
  href,
  icon,
  index,
  anchor,
  active,
}: NavButtonProps) {
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (anchor) {
        e.preventDefault();

        document.getElementById(anchor)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    [anchor]
  );

  return (
    <Button
      as="link"
      target={icon || href[0] !== "/" ? "_blank" : ""}
      href={href}
      onClick={scrollTo}
    >
      {text}
      {icon || ""}
    </Button>
  );
}

NavButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  index: PropTypes.number.isRequired,
  anchor: PropTypes.string,
  active: PropTypes.bool,
};

NavButton.defaultProps = {
  text: "",
  href: "",
  icon: null,
  anchor: "",
  active: false,
};
