import type { Metadata } from "next";
import { sansSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "nickhong.xyz",
  description: "Nick Hong, Web3 Dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansSerif.className} mx-auto`}
        style={{
          background: "#080808",
        }}
      >
        {children}
      </body>
    </html>
  );
}
