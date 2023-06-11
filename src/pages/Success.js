import React, { useState, useEffect } from "react";
import { Footer, Header } from "../components";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";
import { Link, useParams } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract/constant";
import { ethers } from "ethers";
import supabase from "../config/supabase";
var converter = require("hex2dec");

const Success = () => {
  const [OTP, setOTP] = useState(false);
  const [pAddress, setpAddress] = useState("");
  const [productData, setProductData] = useState("");
  const [loader, setLoader] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("Products") // Name of Table
        .select(`*,Orders(*)`)
        .eq("pid", params.id);

      if (error) {
        console.log(error);
      }
      if (data) {
        setProductData(data[0]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const setAddress = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      const { data, error } = await supabase
        .from("Users") // Name of Table
        .select()
        .eq("account", account);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setpAddress(data[0].address);
        // setProductData(data[0]);
      }
    };
    setAddress();
  }, []);
  console.log(productData);

  const getOTP = async () => {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    // console.log(productData.Orders[productData.Orders.length - 1].id);
    const tx1 = await contract.generateOTP(
      productData.Orders[productData.Orders.length - 1].id
    );
    const receipt1 = await tx1.wait();
    let reqID = await converter.hexToDec(receipt1.events[2].topics[1]);
    console.log(reqID, typeof reqID);

    // setTimeout(async () => {
    //   console.log("2nd Contract run");
    //   const tx2 = await contract.getMyOTP(reqID, productData.Orders[0].id);
    //   const receipt2 = await tx2.wait();
    //   console.log(receipt2);
    // }, 15000);

    setLoader(false);
  };

  const tempOTP = async () => {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const tx1 = await contract.getMyOTP(
      "100823545029669307299012045442486703679799424924882425519381664236734673263872",
      productData.Orders[productData.Orders.length - 1].id
    );
    const receipt1 = await tx1.wait();
    let OTP = await converter.hexToDec(receipt1.events[0].topics[1]);
    console.log(receipt1, OTP);
    setLoader(false);
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
              src={`${
                productData
                  ? productData.purl
                  : "https://cdn.questionpro.com/userimages/site_media/no-image.png"
              }`}
              className="h-[100%]"
            ></img>
          </div>
          <div className="w-[100%] flex flex-col gap-2">
            <h1 className="text-[1.2rem]">
              {productData ? productData.name : "name"}
            </h1>
            <h2 className="text-[1.7rem] font-semibold">
              ${productData ? productData.price : "price"}
            </h2>
            <p className="text-[#249B3E] font-semibold text-[1.5rem]">
              CO2 Footprint : {productData ? productData.cfootprint : "cfp"}g
            </p>
            <div>
              <h3 className="font-medium text-[1.1rem] mb-1">
                About this item
              </h3>
              <p>{productData ? productData.description : "name"}</p>
            </div>
            <p>Deliver at :{pAddress ? pAddress : "Address"}</p>
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
