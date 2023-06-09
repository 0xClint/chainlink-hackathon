import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";
import supabase from "../config/supabase";
import { ethers } from "ethers";

const Orders = () => {
  const [productData, setProductData] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const { data, error } = await supabase
        .from("Orders") // Name of Table
        // .select()
        // .select(
        //   `Users (name,address),Products (name,price,category,description,cfootprint,purl,seller)`
        // )
        .select(`*,Products (*)`)
        .eq("user", address);

      if (error) {
        // setFetchError("Could not fetch Users");
        // setTests(null);
        console.log(error);
      }
      if (data) {
        // setTests(data);
        console.log(data);
        setProductData(data);
      }
    };
    fetchUsers();
  }, []);
  console.log(productData);
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
            My Orders
          </p>
          <div className="w-full h-[2px] bg-primaryColor mt-2"></div>
        </div>
      </div>
      <div className="cardContainer flex flex-col mt-10 gap-5 mx-[12%] ">
        {productData
          ? productData.map((item) => {
              // console.log(item);
              return (
                <div className="w-[100%] flex gap-6 rounded-xl border-[#B9B9B9] border-[1px] py-5 px-10">
                  <div className="min-w-[200px] h-[200px] flex justify-center items-center bg-[#F5F5F5] rounded-2xl">
                    <img
                      src={`${
                        item.Products
                          ? item.Products.purl
                          : "https://cdn.questionpro.com/userimages/site_media/no-image.png"
                      }`}
                      className="h-[100%]"
                    ></img>
                  </div>
                  <div className="w-[100%] flex gap-2">
                    <div className="w-[550px]">
                      <h1 className="text-[1.2rem]">
                        {item.Products ? item.Products.name : "name"}
                      </h1>
                      <h2 className="text-[1.7rem] font-semibold">
                        ${item.Products ? item.Products.price : "price"}
                      </h2>
                      <p className="text-[#249B3E] font-medium">
                        CO2 Footprint :
                        {item.Products ? item.Products.cfootprint : "cfp"}g
                      </p>
                      <p className="mt-2">
                        {item.Products
                          ? item.Products.description
                          : "description"}
                      </p>
                    </div>
                    <div className=" flex  flex-col gap-5 h-[100%]">
                      <div className="flex flex-col gap-5 items-start justify-start">
                        <p>
                          Category :{" "}
                          {item.Products ? item.Products.category : "Category"}
                        </p>
                        <p>
                          Product ID :{" "}
                          {item.Products ? item.Products.pid : "pid"}
                        </p>
                        <p>
                          Quantity :{" "}
                          {item.quantity ? item.quantity : "quantity"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : "a"}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
