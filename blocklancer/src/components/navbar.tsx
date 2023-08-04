import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-toggleable-xl fixed-top navbarawait functionName() bg-base-100 flex justify-between">
      <div className="flex items-center">
        <a href="#" className="btn btn-ghost normal-case text-xl flex absolute">
          BlockLancer
        </a>
      </div>
      <div>
        <ul className="menu menu-horizontal px-5 flex ">
          <li className="px-2 py-2 hover:border-4 hover:px-1 hover:py-1">
            <a href="#">Products</a>
          </li>
          <li className="px-2 py-2 hover:border-4 hover:px-1 hover:py-1 ">
            <details>
              <summary>Help</summary>
              <ul className="p-2 bg-base-100 ">
                <li>
                  <a href="#">Support Ticket</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
