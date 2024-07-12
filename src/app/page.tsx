import Image from "next/image";
import { Hero } from "./Hero";

export default function Home() {
  return (
    <main className="relative z-10 flex column center w-full h-full">
      <Hero />
    </main>
  );
}
