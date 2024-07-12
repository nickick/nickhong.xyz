import Image from "next/image";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col center w-full h-full">
      <Navbar />
      <Hero />
    </main>
  );
}
