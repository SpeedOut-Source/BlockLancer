import Link from "next/link";
import React from "react";
import Logo from "./logo";
import Hamburger from "./hamburger";
import ConnectWalletButton from "./connect_wallet/connet_wallet_button";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="flex w-full items-start justify-between xl:hidden">
        <div className="flex items-center gap-2">
          <Hamburger />
          <Logo />
        </div>
        <ConnectWalletButton />
      </div>
      <div className="hidden w-full justify-between xl:flex mx-4">
        <Logo />
        <div className="flex gap-10">
          <Link className="btn btn-ghost" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost" href="/">
            Features
          </Link>
          <Link className="btn btn-ghost" href="/">
            My orders
          </Link>
        </div>
        <ConnectWalletButton />
      </div>
    </header>
  );
};

export default Navbar;
