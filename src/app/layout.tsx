import type { Metadata } from "next";
import { sansSerif } from "./fonts";
import "./globals.css";
import { LoadedProvider } from "./LoadedContext";
import { RootLayoutClient } from "./RootLayoutClient";
import { ScrollHandler } from "./ScrollHandler";

export const metadata: Metadata = {
  title: "Nick Hong — Senior AI Engineer",
  description: "Nick Hong, Senior AI Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansSerif.className} mx-auto text-white`}
        style={{
          background: "#080808",
        }}
      >
        <LoadedProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
          <ScrollHandler />
        </LoadedProvider>
      </body>
    </html>
  );
}
