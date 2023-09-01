import Link from "next/link";
import React from "react";
import Search from "./search";

const Navbar: React.FC = () => {
  return (
    <div className="border-2 navbar bg-base-100 border-sky-500">
      <div className="flex-auto">
        <a className="text-xl text-transparent normal-case transition ease-in-out btn btn-ghost bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 duration-2000 hover:bg-gradient-to-l">
          BlockLancer
        </a>
      </div>
      <div className="flex-none">
        <Search />
        <ul className="flex items-center px-1 menu menu-horizontal">
          <li><a>About</a></li>
          <li className="bg-transparent">
            <Link href="/signup" className="hover:!bg-transparent">
              <button className="bg-transparent btn btn-ghost btn-outline btn-accent btn-sm">
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
