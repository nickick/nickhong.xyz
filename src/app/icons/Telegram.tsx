import Image from "next/image";

export default function Telegram() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/icons/telegram.svg"
        width={20}
        height={20}
        alt="Telegram logo"
      />
    </div>
  );
}
