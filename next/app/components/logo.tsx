"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Logo() {
  const router = useRouter();
  return (
    <Link href="/">
      <div className="py-2 my-2 ">
        <img className="w-48" src="/logo_green.webp" alt="Logo" />
      </div>
    </Link>
  );
}
