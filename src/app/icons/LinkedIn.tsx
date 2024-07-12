import Image from "next/image";

export default function LinkedIn() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/icons/linkedin.svg"
        width={20}
        height={20}
        alt="Linkedin logo"
      />
    </div>
  );
}
