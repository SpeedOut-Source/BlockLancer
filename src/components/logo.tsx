import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Link href="/" className="btn btn-ghost flex items-center gap-2">
        <div className="relative h-12 w-11">
          <Image alt="BlockLancer logo" src="/logo.png" fill />
        </div>
        <h1
          className={twMerge("hidden text-4xl capitalize sm:inline", className)}
        >
          BlockLancer
        </h1>
      </Link>
    </div>
  );
}
