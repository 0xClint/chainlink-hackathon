import React, { useState } from "react";
import { Footer, Header } from "../../components";
import { ethers } from "ethers";
import Lottie from "react-lottie-player";
import loaderGif from "../../assets/loader.json";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/constant";
var converter = require("hex2dec");

const Deliver = () => {
  const [loader, setLoader] = useState(false);

  const reachedToLocation = async () => {
    // if (orderID) {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.deleveryReached(3);
    const receipt = await tx.wait();
    console.log(receipt);
    setLoader(false);
    // }
  };
  const orderCompleted = async () => {
    // if (orderID) {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.deliveryComplete(
      3,
      converter.hexToDec(
        "0x00000000000000000000000000000000000000000000000000000000000e5cab"
      )
    );
    const receipt = await tx.wait();
    console.log(receipt);
    setLoader(false);
    // }
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
      <div className="headingContent mx-[5%] mt-5">
        <p className="text-[#666666] font-semibold text-[1.5rem]">
          Order to be deliver
        </p>
        <div className="w-full h-[2px] bg-primaryColor mt-2"></div>
      </div>
      <div className="mt-10 mx-[5%]">
        <button
          onClick={() => reachedToLocation()}
          className="text-[1.3rem] font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-3 px-4 rounded-lg  hover:bg-[#007AAF]"
        >
          Reached to Location
        </button>
        <button
          onClick={() => orderCompleted()}
          className="text-[1.3rem] font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-3 px-4 rounded-lg  hover:bg-[#007AAF]"
        >
          Order Completed
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Deliver;
