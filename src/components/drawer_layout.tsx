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
      <div className="flex flex-col gap-10">
        <div className="lg:hidden">
          <Logo className="inline text-base-content" />
        </div>

        <button className="btn w-full">Homepage</button>
        <div className=" space-y-3">
          <div className="flex flex-col space-y-2">
            <button className="btn">My Assets</button>
          </div>
          <div className="flex justify-between space-x-2">
            <Link
              href={"http://facebook.com/bandcoinio"}
              className="btn flex h-16 flex-col items-center  text-xs normal-case"
              target="_blank"
            >
              <Facebook size={20} />
              <span>Facebook</span>
            </Link>
            <Link
              href={"http://x.com/bandcoinio"}
              className="btn flex h-16 flex-1 flex-col items-center text-xs normal-case "
              target="_blank"
            >
              <Image src="/images/icons/x.svg" alt="X" height={18} width={18} />
              <span>X</span>
            </Link>
            <Link
              href={"http://instagram.com/bandcoin"}
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
        <div>Login | Sign up</div>
        <div className="flex w-full flex-col text-center text-xs text-base-content/60">
          <p>© 2023 BlockLancer </p>
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
