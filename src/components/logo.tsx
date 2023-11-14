import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Link href="/" className="btn btn-ghost flex items-center gap-2">
        <div className="relative h-12 w-11">
          <Image className="rounded-full cursor-pointer hover:repeat-1 hover:scale-110 hover:rotate-180 transition-all duration-700" alt="BlockLancer logo" src="/logo.png" fill />
        </div>
        <h1
          className={twMerge("hidden text-4xl text-stone-300 capitalize sm:inline", className)}
        >
          BlockLancer
        </h1>
      </Link>
    </div>
  );
}
