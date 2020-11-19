import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/logo.svg";

const Navbar = () => {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-20">
        <div className="inline-flex">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex space-x-4">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="JR" className="h-12" />
            </Link>
            </div>
          </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div>
                <Link className="block px-4 py-2 text-blue-900 hover:text-blue-600" to="/about">
                  Start Here
                </Link>
              </div>
          </div>
        </div>
      </div>
    )
};

export default Navbar;
