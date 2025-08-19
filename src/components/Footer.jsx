import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------ Left Section -------- */}
        <div>
          <img className="w-40 mb-5" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            In this step of the project, we’ll take the current state of affairs
            after completing the first part of the exercise and add the required
            functionality to render a static menu with a fixed list of menu
            items.
          </p>
        </div>

        {/* ------ Middle Section -------- */}
        <div>
          <h1 className="text-xl font-medium mb-5">COMPANY</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About-Us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------ Right Section -------- */}
        <div>
          <h1 className="text-xl font-medium mb-5">GET IN TOUCH</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+255 673 273 032</li>
            <li>juniorkhatib7@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ----- Copyright Text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ Prescripto - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
