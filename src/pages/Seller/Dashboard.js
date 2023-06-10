import React, { useState, useEffect } from "react";
import { Footer, Header } from "../../components";
import { ethers } from "ethers";
import Lottie from "react-lottie-player";
import loaderGif from "../../assets/loader.json";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/constant";
import supabase from "../../config/supabase";

const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [address, setAddress] = useState("");
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("Orders") // Name of Table
        .select(`*,Users (name,address),Products (*,Sellers(*))`);

      if (error) {
        // setFetchError("Could not fetch Users");
        // setTests(null);
        console.log(error);
      }
      if (data) {
        // setTests(data);
        // console.log(data);
        setSellerData(await filterSeller(data));
        // setFetchError(null);
      }
    };
    fetchUsers();
  }, []);

  const filterSeller = async (data) => {
    let sellerData = data.filter((el) => {
      return (
        el.Products.Sellers.account ==
        "0x74A964DCACBd962A3179120c9727F9F4F90112a6"
      );
    });
    console.log(sellerData[0]);
    return sellerData[0];
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data, error } = await supabase
  //       .from("Orders") // Name of Table
  //       // .select()
  //       // .select(
  //       //   `Users (name,address),Products (name,price,category,description,cfootprint,purl,seller)`
  //       // )
  //       .select(`*,Products (*,Sellers(*)),Users(*)`)
  //       .eq("user", "0x562f28a7F5B904a6523FF705881Cb8c60aa794CB");

  //     if (error) {
  //       // setFetchError("Could not fetch Users");
  //       // setTests(null);
  //       console.log(error);
  //     }
  //     if (data) {
  //       // setTests(data);
  //       console.log(data);
  //       // setFetchError(null);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  const assignDelivery = async () => {
    // if (orderID) {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = signer.getAddress();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.assignDeliverAgent(sellerData.Por, account);
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
          Orders to be deliver
        </p>
        <div className="w-full h-[2px] bg-primaryColor mt-2"></div>
      </div>
      <div className="cardContainer flex flex-col mt-10 mx-[12%] ">
        <div className="w-[100%] flex gap-6 rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
          <div className="min-w-[250px] h-[250px] flex justify-center items-center bg-[#F5F5F5] rounded-2xl">
            <img
              src={require("../../assets/mobile.png")}
              className="h-[100%]"
            ></img>
          </div>
          <div className="w-[100%] flex gap-3">
            <div className="w-[550px] flex flex-col gap-2">
              <h1 className="text-[1.2rem]">
                {sellerData ? sellerData.Products.name : "name"}
              </h1>
              <h2 className="text-[1.7rem] font-semibold">
                ${sellerData ? sellerData.Products.price : "price"}
              </h2>
              <p className="text-[#249B3E] font-medium text-[1rem]">
                CO2 Footprint :
                {sellerData.Products ? sellerData.Products.cfootprint : "cfp"}g
              </p>
              <p className="font-light text-[0.9rem]">
                {sellerData ? sellerData.Products.description : "description"}
              </p>
              <p>Ordered by : {sellerData ? sellerData.Users.name : "name"}</p>
              <p>
                Deliver to : {sellerData ? sellerData.Users.address : "address"}
              </p>
            </div>
            <div className=" flex  flex-col gap-5">
              {/* <div className="flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col gap-1">
                  <label htmlFor="oderId">Order Id</label>
                  <input
                    type="number"
                    id="oderId"
                    value={orderID}
                    placeholder="order id..."
                    className="bg-[#F3F9FB] w-[200px] h-10 p-5 rounded-md"
                    onChange={(e) => setOrderID(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="agentAddr">Delivery Agent Address</label>
                  <input
                    type="text"
                    id="agentAddr"
                    value={address}
                    placeholder="agent address..."
                    className="bg-[#F3F9FB] w-[200px] h-10 p-5 rounded-md"
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </div> */}
              <div className="">
                <button
                  onClick={() => assignDelivery()}
                  className="text-[1.3rem] font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-3 px-4 rounded-lg  hover:bg-[#007AAF]"
                >
                  Reached to Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
