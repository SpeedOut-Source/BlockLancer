import Link from "next/link";
import React from "react";
import Logo from "./logo";
import Hamburger from "./hamburger";
import LoginWithGoogle from "./login_with_google";

const Navbar: React.FC = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="flex w-full items-start justify-between xl:hidden">
        <div className="flex items-center gap-2">
          <Hamburger />
          <Logo />
        </div>
        <LoginWithGoogle />
      </div>
      <div className="hidden w-full justify-between xl:flex">
        <div className="flex space-x-2 bg-base-100">
          <Logo />
          <div className="flex w-full rounded-md bg-base-200">
            <Link className="btn btn-ghost" href="/">
              Home
            </Link>
            <Link className="btn btn-ghost" href="/">
              Features
            </Link>
            <Link className="btn btn-ghost" href="/">
              About us
            </Link>
            <Link className="btn btn-ghost" href="/">
              Contact us
            </Link>
          </div>
        </div>

        <LoginWithGoogle />
      </div>
    </header>
  );
};

export default Navbar;
