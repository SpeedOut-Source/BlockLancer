import Link from "next/link";
import React from "react";
import Search from "./search";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 border-2 border-sky-500">
      <div className="flex-auto">
        <a className="btn btn-ghost normal-case text-xl bg-clip-text text-transparent 
          bg-gradient-to-r from-pink-500 to-violet-500 transition duration-2000 ease-in-out hover:bg-gradient-to-l">
          BlockLancer
        </a>
      </div>
      <div className="flex-none">
        <Search />
        <ul className="menu menu-horizontal px-1 flex items-center">
          <li><a>About</a></li>
          <li className="bg-transparent">
            <Link href="/signup" className="hover:!bg-transparent">
              <button className="btn btn-ghost btn-outline btn-accent btn-sm bg-transparent">
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
