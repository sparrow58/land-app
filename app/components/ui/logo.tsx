import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Aqarat">
      <Image
        src="/images/logo.png"
        alt="Aqarat Logo"
        width={120}
        height={48}
        priority
      />
    </Link>
  );
}
