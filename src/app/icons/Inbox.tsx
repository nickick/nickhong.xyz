import Image from "next/image";

export default function Inbox() {
  return (
    <div className="flex justify-center items-center">
      <Image src="/icons/inbox.svg" width={20} height={20} alt="Inbox logo" />
    </div>
  );
}
