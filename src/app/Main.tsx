"use client";

import { FC } from "react";
import { Hero } from "./Hero";
import { LoadedProvider } from "./LoadedContext";
import { Navbar } from "./Navbar";
import { Projects } from "./Projects";
import { OtherWork } from "./OtherWork";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { ModalProvider } from "./ModalContext";
import { About } from "./About";

const Main: FC = ({}) => {
  return (
    <LoadedProvider>
      <ModalProvider>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <OtherWork />
        <Contact />
        <Footer />
      </ModalProvider>
    </LoadedProvider>
  );
};

export { Main };
