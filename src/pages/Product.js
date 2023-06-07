import React from "react";
import { Footer, Header } from "../components";

const Product = () => {
  return (
    <div>
      <Header />
      <div className="w-[100vw]">
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
        <div className=" h-[2px] bg-primaryColor mt-8 mx-[5%]"></div>
      </div>
      <div className=" mx-[5%] flex gap-10">
        <div className="min-w-[400px] h-[400px] flex justify-center items-center bg-[#F5F5F5] rounded-2xl">
          <img src={require("../assets/mobile.png")}></img>
        </div>
        <div className="w-[100%]">
          <h1 className="text-[2rem]">Galaxy M53 (4GB | 64 GB )</h1>
          <h2 className="text-[2.5rem] font-semibold">₹31999</h2>
          <div>
            <h3 className="font-medium text-[1.1rem] mb-1">About this item</h3>
            <ul className="font-light list-disc ml-4 flex flex-col gap-2">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
              <li>
                Vestibulum consectetur, est id consequat ultricies, nibh lacus
                vehicula nisl.
              </li>
              <li>Fusce cursus eu sapien et luctus.</li>
              <li>
                magna sem luctus ante, a mollis velit sem eu nunc. Aliquam nec
                pharetra leo.
              </li>
            </ul>
          </div>
          <button className="text-[1.5rem] font-medium text-[#ffffff] bg-primaryColor py-3 px-4 rounded-lg my-5 hover:bg-[#007AAF]">
            BUY NOW
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
