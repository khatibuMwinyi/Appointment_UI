import React from "react";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <h1>
          CONTACT <span>Us</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-center my-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 items-start">
          <h1 className="font-semibold text-lg text-gray-600">Our OFFICE</h1>
          <p className="text-gray-500">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555‑0132 <br />
            Email: greatstackdev@gmail.com
          </p>
          <h1 className="font-semibold text-lg text-gray-600">
            Careers at PRESCRIPTO
          </h1>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border px-8 py-4 text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
