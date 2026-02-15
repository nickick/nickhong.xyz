"use client";

import { FC } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ModalProvider } from "./ModalContext";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const RootLayoutClient: FC<RootLayoutProps> = ({ children }) => {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col" style={{ background: "#080808" }}>
        <Navbar />
        <main className="flex-grow relative z-10 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
};
