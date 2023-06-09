import React, { useState } from "react";
import { Footer, Header } from "../../components";
import { ethers } from "ethers";
import Lottie from "react-lottie-player";
import loaderGif from "../../assets/loader.json";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/constant";

const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [address, setAddress] = useState("");

  const assignDelivery = async () => {
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
    const tx = await contract.assignDeliverAgent(
      orderID,
      "0x562f28a7F5B904a6523FF705881Cb8c60aa794CB"
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
          <div className="w-[100%] flex gap-2">
            <div className="w-[550px]">
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
            <div className=" flex  flex-col gap-5">
              <div className="flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col gap-1">
                  <label for="oderId">Order Id</label>
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
                  <label for="agentAddr">Delivery Agent Address</label>
                  <input
                    type="text"
                    id="agentAddr"
                    value={address}
                    placeholder="agent address..."
                    className="bg-[#F3F9FB] w-[200px] h-10 p-5 rounded-md"
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="">
                <button
                  onClick={() => assignDelivery()}
                  className="text-[1.3rem] font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-3 px-4 rounded-lg  hover:bg-[#007AAF]"
                >
                  Assign Order
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
