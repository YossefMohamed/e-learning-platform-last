import React from "react";
import { FaElementor } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white  shadow  relative  border-t-2">
      <div className="w-full h-full absolute z-10 top-0 right-0 bg-[url('/pattern.png')] opacity-10"></div>

      <div className="w-full px-10 mx-auto py-4 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="logo text-5xl text-tsecondary bg-light">
            <FaElementor />
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm  text-tsecondary font-bold sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
