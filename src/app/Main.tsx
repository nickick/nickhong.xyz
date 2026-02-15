"use client";

import { FC } from "react";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { OtherWork } from "./OtherWork";
import { Contact } from "./Contact";
import { About } from "./About";

const Main: FC = ({}) => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <OtherWork />
      <Contact />
    </>
  );
};

export { Main };
