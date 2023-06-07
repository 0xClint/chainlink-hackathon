import React from "react";
import { Slider } from "../components";

const Home = () => {
  return (
    <div>
      <ul className="flex justify-center gap-3 font-medium text-[0.9rem] my-3">
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer hover:bg-[#E4F8FF]">
          Premium Fruits
        </li>
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer hover:bg-[#E4F8FF]">
          Home & Kitchen
        </li>
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer hover:bg-[#E4F8FF]">
          Electronics
        </li>
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer hover:bg-[#E4F8FF]">
          Fashion
        </li>
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer hover:bg-[#E4F8FF]">
          Beauty
        </li>
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer hover:bg-[#E4F8FF]">
          Sports
        </li>
        <li className="py-1 px-3 rounded-2xl bg-[#F3F9FB] cursor-pointer">
          Toys & Luggage
        </li>
      </ul>
      <Slider />
      <div>
        <div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
