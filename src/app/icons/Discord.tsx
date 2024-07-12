import Image from "next/image";

export default function Discord() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/icons/discord.svg"
        width={20}
        height={20}
        alt="Discord logo"
      />
    </div>
  );
}
