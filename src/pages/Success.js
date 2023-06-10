import React, { useState } from "react";
import { Footer, Header } from "../components";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract/constant";
import { ethers } from "ethers";
var converter = require("hex2dec");

const Success = () => {
  const [OTP, setOTP] = useState(false);
  // const [OTP, setOTP] = useState(true);
  const [loader, setLoader] = useState(false);

  const getOTP = async () => {
    // setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx1 = await contract.generateOTP(3);
    const receipt1 = await tx1.wait();
    console.log(receipt1);
    // console.log(Number(receipt1.logs[0].topics[1]));
    // setLoader(false);
    // const tx2 = await contract.getMyOTP(2);
    // const receipt2 = await tx2.wait();
    // console.log(receipt2);
  };

  const tempOTP = async () => {
    // setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const tx1 = await contract.getMyOTP(
      converter.hexToDec(
        "0x38c676bd41934585a727741782833deaee0ae76ffb49cdc5a23ac26dba9f11b5"
      ),
      3
    );
    const receipt1 = await tx1.wait();
    console.log(receipt1);
  };

  return (
    <div>
      {loader && (
        <div
          className="fixed w-screen h-screen bg-slate-500 flex justify-center items-center"
          style={{ background: "rgba(255, 255, 255, 0.65)" }}
        >
          <Lottie
            loop
            animationData={loaderGif}
            play
            style={{
              width: 200,
              height: 200,
            }}
          />
        </div>
      )}
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
      <div className="flex flex-col mt-10 mx-[5%] gap-5 text-[#008ECC] rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        consectetur, est id consequat ultricies, nibh lacus vehicula nisl, eu
        auctor turpis ante eu ante. Fusce cursus eu sapien et luctus. Donec eu
        diam quis nunc interdum luctus. Ut velit metus, laoreet ut justo vitae
      </div>
      <div className="flex mx-[5%] gap-5 my-5">
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
          {OTP ? (
            <div className="flex flex-col gap-5 mt-7 h-20 border-[1px] border-[#747474] rounded justify-center items-center text-[3rem] font-medium">
              101233
            </div>
          ) : (
            <div>
              <div
                onClick={() => getOTP()}
                className="flex flex-col gap-5 mt-7 h-20 border-[1px] bg-primaryColor cursor-pointer text-[#ffffff] border-primaryColor rounded-lg hover:bg-[#007AAF] justify-center items-center text-[2.7rem] font-medium"
              >
                Get OTP
              </div>
              <div
                onClick={() => tempOTP()}
                className="flex flex-col gap-5 mt-7 h-20 border-[1px] bg-primaryColor cursor-pointer text-[#ffffff] border-primaryColor rounded-lg hover:bg-[#007AAF] justify-center items-center text-[2.7rem] font-medium"
              >
                temp otp
              </div>
            </div>
          )}
          <p className="mt-4 text-[0.9rem]">
            magna sem luctus ante, a mollis velit sem eu nunc. Aliquam nec
            pharetra.
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-[5%] gap-5 rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
        <h2 className="font-semibold text-[1.5rem]">Delivery in progress</h2>
        <div className="flex justify-start gap-14 text-[1.1rem]">
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order Dispatched</p>
            <input type="radio" checked={true} readOnly></input>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order out for delivery</p>
            <input type="radio" checked={true} readOnly></input>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>OTP gave to Delivery Boy</p>
            <input type="radio" readOnly></input>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p>Order Received</p>
            <input type="radio" readOnly></input>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
