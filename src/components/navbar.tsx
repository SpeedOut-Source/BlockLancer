import Link from "next/link";
import React from "react";
import Logo from "./logo";
import Hamburger from "./hamburger";
import ConnectWalletButton from "./connect_wallet/connet_wallet_button";

const Navbar: React.FC = () => {
  return (
    <header className="navbar bg-white/30 hover:bg-white/50 rounded-md">
      <div className="flex w-full items-start justify-between xl:hidden">
        <div className="flex items-center gap-2">
          <Hamburger />
          <Logo />
        </div>
        <ConnectWalletButton />
      </div>
      <div className="hidden w-full justify-between xl:flex mx-4">
        <Logo />
        <div className="flex gap-10 text-white/70  hover:text-white/80">
          <Link className="btn btn-ghost font-extrabold hover:text-white" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost font-extrabold hover:text-white" href="/#latest-gigs">
            Latest GIGs
          </Link>
          <Link className="btn btn-ghost font-extrabold hover:text-white" href="about">
            About
          </Link>
        </div>
        <ConnectWalletButton />
      </div>
    </header>
  );
};

export default Navbar;
