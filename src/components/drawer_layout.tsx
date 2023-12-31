import { Facebook, Instagram } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";

interface DrawerLayoutProps {
  key?: React.Key;
}

function DrawerLayout(_props: DrawerLayoutProps) {
  return (
    <div
      style={{
        scrollbarGutter: "stable",
      }}
      className="scrollbar-style flex h-full max-h-[800px] w-80 flex-col justify-between space-y-10 overflow-y-auto px-4 pb-4 pt-10"
    >
      <div className="flex flex-col gap-3 ">
        <div className="sm:hidden mb-10">
          <Logo className="inline text-base-content" />
        </div>

        <button className="btn w-full">Homepage</button>
        <div className="space-y-4">
          <div className="flex flex-col">
            <Link href={'/#latest-gigs'}><button className="btn w-full">Latest GIGs</button></Link>
          </div>
          <div className="flex justify-between space-x-2">
            <Link
              href={"http://facebook.com/"}
              className="btn flex h-16 flex-col items-center  text-xs normal-case"
              target="_blank"
            >
              <Facebook size={20} />
              <span>Facebook</span>
            </Link>
            <Link
              href={"http://x.com/"}
              className="btn flex h-16 flex-1 flex-col items-center text-xs normal-case "
              target="_blank"
            >
              <Image src="/images/icons/x.svg" alt="X" height={18} width={18} />
              <span className="font-extrabold">X</span>
            </Link>
            <Link
              href={"http://instagram.com/"}
              className="btn flex h-16 flex-col items-center text-xs normal-case"
              target="_blank"
            >
              <Instagram />
              <span>Instagram</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-5">
        <Logo/>
        <div className="flex w-full flex-col text-center text-xs text-base-content/60">
          <p>©2023 SpeedOut | BlockLancer </p>
          <div className="flex w-full justify-center gap-2 ">
            <Link className="link-hover link" href="/about">
              About
            </Link>
            <Link className="link-hover link" href="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerLayout;
