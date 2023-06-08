import React from "react";
import { Footer, Header } from "../components";

const Success = () => {
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
        <div className="headingContent mx-[5%]">
          <p className="text-[#666666] font-semibold text-[1.5rem]">
            Order Received
          </p>
          <div className="w-full h-[2px] bg-primaryColor mt-2"></div>
        </div>
      </div>
      <div className="flex mx-[5%] gap-5 mt-10 mb-5">
        <div className="w-[100%] flex gap-6 rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
          <div className="min-w-[250px] h-[250px] flex justify-center items-center bg-[#F5F5F5] rounded-2xl">
            <img
              src={require("../assets/mobile.png")}
              className="h-[100%]"
            ></img>
          </div>
          <div className="w-[100%] flex flex-col gap-2">
            <h1 className="text-[1.2rem]">Galaxy M53 (4GB | 64 GB )</h1>
            <h2 className="text-[1.7rem] font-semibold">₹31999</h2>

            <ul className="font-light list-disc ml-4 flex flex-col gap-1 text-[0.8rem]">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>
                Donec augue tellus, placerat nec sem eget, consequat malesuada
                mauris. Mauris hendrerit sed sapien vitae tincidunt. Praesent
                volutpat, erat vel faucibus tristique
              </li>
              <li>Fusce cursus eu sapien et luctus.</li>
              <li>
                magna sem luctus ante, a mollis velit sem eu nunc. Aliquam nec
                pharetra leo.
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[300px] rounded-xl border-[#B9B9B9] border-[1px] py-5 px-6">
          <h2 className="text-[1.2rem] font-medium mb-3">Your OTP</h2>
          <div className="flex flex-col gap-5 mt-7 h-20 border-[1px] border-[#747474] rounded justify-center items-center text-[3rem] font-medium">
            101233
          </div>
          <p className="mt-2 text-[0.9rem]">
            magna sem luctus ante, a mollis velit sem eu nunc. Aliquam nec
            pharetra.
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-[5%] gap-5 rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
        <h2 className="font-semibold text-[1.5rem]">Delivery in progress</h2>
        <div className="flex justify-start gap-14 text-[1.1rem]">
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order is received</p>
            <input type="radio" checked={true}></input>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order is received</p>
            <input type="radio"></input>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order is received</p>
            <input type="radio"></input>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order is received</p>
            <input type="radio"></input>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
