import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar flex justify-between  bg-base-100">
      <div className="space-x-2 bg-base-100">
        <Link className="btn" href="/">
          BlockLancer
        </Link>
        <div className="rounded-md bg-base-200 ">
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

      <div className="space-x-2">
        <Link className="btn" href="/">
          Log in
        </Link>
        <Link className="btn" href="/">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
