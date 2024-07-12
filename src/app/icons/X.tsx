import Image from "next/image";

export default function X() {
  return (
    <div className="flex justify-center items-center">
      <Image src="/icons/x.svg" width={20} height={20} alt="X logo" />
    </div>
  );
}
