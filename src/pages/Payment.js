import React from "react";
import { Footer, Header } from "../components";

const Payment = () => {
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
      <div className="flex mx-[5%] gap-5 my-10">
        <div className="w-[100%] flex flex-col gap-5">
          <div className="w-[100%] rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
            <h2 className="text-[1.2rem] font-medium mb-5">Deliver To:</h2>
            <textarea
              className="bg-[#F3F9FB] w-full h-32 p-5 rounded-md"
              placeholder="Address here..."
            ></textarea>
          </div>
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
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
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
        </div>
        <div className="min-w-[300px]">
          <div className="w-full rounded-xl border-[#B9B9B9] border-[1px] py-5 px-6 h-[250px]">
            <h2 className="text-[1.2rem] font-medium mb-3">Price Details</h2>
            <div className="flex flex-col gap-5 mt-7">
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="font-medium">$1000</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p className="font-medium">$10</p>
              </div>
              <div className="h-[2px] w-full bg-[#000000]"></div>
              <div className="flex justify-between">
                <p>Total</p>
                <p className="font-medium">$1010</p>
              </div>
            </div>
          </div>
          <p className="text-[#E51F1F] mt-3 mb-1 text-center">
            Please provide valid address.
          </p>
          <div className="text-[1.3rem] font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-3 px-4 rounded-lg  hover:bg-[#007AAF]">
            PAY NOW
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
