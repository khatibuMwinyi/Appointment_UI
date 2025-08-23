import React from "react";
import { assets } from "../assets/assets";
const About = () => {
  const whyUs = [
    {
      point: "Efficiency:",
      explaination:
        "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      point: "Convenience:",
      explaination:
        "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      point: "Personalization:",
      explaination:
        "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 pt-10">
        <h1>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-12 my-10">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col gap-6 justify-center md:w-2/4 pt-2 text-sm text-gray-600 ">
          <p className="">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <h1>
          WHY
          <span className="">CHOOSE US</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row mb -20">
        {whyUs.map((item, index) => (
          <div className="flex flex-col gap-5 text-[15px] border px-10 md:px-16 py-8 sm:py-16 hover:bg-primary hover:text-white transition-all duration-300">
            <b>{item.point}</b>
            <p>{item.explaination}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
