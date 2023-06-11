import React, { useEffect, useState } from "react";
import {
  ProductCard,
  CategoryCard,
  Slider,
  Header,
  Footer,
} from "../components";
import { ArrowRight } from "../assets";
import { Link } from "react-router-dom";
import supabase from "../config/supabase";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";

const cardData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  // { id: 6 },
];

const Home = () => {
  const { isWeb3Enabled } = useMoralis();
  const [productData, setProductData] = useState();
  const [electronics, setElectronics] = useState();
  const [isUser, setisUser] = useState(true);
  const [grocery, setGrocery] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("Products") // Name of Table
        .select();

      if (error) {
        console.log("error");
        console.log(error);
      }
      if (data) {
        console.log(data);
        await setElectronics(
          await data.filter((item) => item["category"] == "Electronics")
        );
        await setGrocery(
          await data.filter((item) => item["category"] == "Grocery")
        );
        await setProductData(data);
      }
    };
    fetchProducts();
  }, []);

  const confirmUser = async (array) => {
    if (isWeb3Enabled) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      let userArray = array.filter(function (el) {
        return el.account == account;
      });
      if (!userArray.length) {
        setisUser(false);
        console.log("No User");
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("Users") // Name of Table
        .select();

      if (error) {
        console.log(error);
      }
      if (data) {
        confirmUser(data);
      }
    };
    fetchProducts();
  }, []);
  // console.log(productData);
  return (
    <div>
      {!isUser && (
        <div
          className="fixed w-screen h-[100%] bg-slate-500 flex justify-center items-start -z-1"
          style={{ background: "rgba(0, 0, 0, 0.27)" }}
        >
          <div className="z-1000 w-[100%] text-center  bg-[#ffffff] rounded-xl py-5 px-10 flex flex-col justify-center items-center gap-5">
            <Link to="/create/user">
              <button className="bg-primaryColor text-[#ffffff] text-white py-2 px-6 w-60 rounded-[5px] text-[1.1rem] hover:bg-[#007AAF]">
                Please Create Account
              </button>
            </Link>
          </div>
        </div>
      )}

      <Header />
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
        <Slider className="-z-10" />
        <div className="ElectronicSection mx-[5%] my-10">
          <div className="headingContent w-[100%]">
            <div className="flex justify-between">
              <p className="text-[#666666] font-semibold text-[1.2rem]">
                Electronics
              </p>
              <div className="flex items-center gap-2 font-medium cursor-pointer hover:text-[#666666]">
                View All
                <ArrowRight className="" />
              </div>
            </div>
            <div className="w-full h-[2px] bg-[#EDEDED] mt-2">
              <div className="w-[110px] h-[2px] bg-primaryColor"></div>
            </div>
          </div>
          <div className="cardContainer w-[100%] flex justify-start gap-5 my-5">
            {electronics
              ? electronics.map((data) => {
                  return <ProductCard key={data.pid} data={data} />;
                })
              : ""}
          </div>
        </div>
        <div className="CategorySection mx-[5%] my-10">
          <div className="headingContent w-[100%]">
            <div className="flex justify-between">
              <p className="text-[#666666] font-semibold text-[1.2rem]">
                Grocery
              </p>
              <div className="flex items-center gap-2 font-medium cursor-pointer hover:text-[#666666]">
                View All
                <ArrowRight className="" />
              </div>
            </div>
            <div className="w-full h-[2px] bg-[#EDEDED] mt-2">
              <div className="w-[110px] h-[2px] bg-primaryColor"></div>
            </div>
          </div>
          <div className="cardContainer w-[100%] flex justify-start gap-5 my-5">
            {grocery
              ? grocery.map((data) => {
                  return <ProductCard key={data.pid} data={data} />;
                })
              : ""}
          </div>
        </div>
        <div className="CategorySection mx-[5%] my-10">
          <div className="headingContent w-[100%]">
            <div className="flex justify-between">
              <p className="text-[#666666] font-semibold text-[1.2rem]">
                Category
              </p>
              <Link to={"/category"}>
                <div className="flex items-center gap-2 font-medium cursor-pointer hover:text-[#666666]">
                  View All
                  <ArrowRight className="" />
                </div>
              </Link>
            </div>
            <div className="w-full h-[2px] bg-[#EDEDED] mt-2">
              <div className="w-[110px] h-[2px] bg-primaryColor"></div>
            </div>
          </div>
          <div className="cardContainer w-[100%] flex justify-center gap-12 my-5 mt-7">
            {cardData.map(({ id }) => {
              return <CategoryCard key={id} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
