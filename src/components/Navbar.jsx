import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-between py-4 mb-5 text-sm border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} />
      <ul className="hidden md:flex gap-5 font-medium items-start ">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={assets.profile_pic} className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} className="w-2.5" alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile{" "}
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-appointment")}
                >
                  My Appointment
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => setToken(false)}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white py-3 px-8 font-light rounded-full hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
