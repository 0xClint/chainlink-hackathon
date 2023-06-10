import React, { useEffect, useState } from "react";
import { Header, Footer } from "../components";
import { UploadImage } from "../assets";
import supabase from "../config/supabase";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract/constant";

const optionData = [
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Grocery",
  },
  {
    id: 3,
    name: "Fashion",
  },
  {
    id: 4,
    name: "Sports",
  },
  {
    id: 5,
    name: "Home & Kitchen",
  },
  {
    id: 6,
    name: "Beauty",
  },
  {
    id: 7,
    name: "Toys & Luggage",
  },
];

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cfp, setcfp] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");

  //   category: "Grocery";
  //   cfootprint: -3;
  //   description: "Citrus organic oranges from mars";
  //   name: "Orange 1 piece";
  //   price: 1;
  //   purl: "https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  //   seller: 1;

  const insertProduct = async () => {
    let { data, error } = await supabase
      .from("Products")
      .insert([
        {
          category,
          cfootprint: cfp,
          description,
          name: title,
          price,
          purl: "temp",
          seller: 3,
        },
      ]) // Name of Table
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const createProduct = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI);

    const tx = await contract.addProduct();
    const receipt = await tx.wait();
    console.log(receipt);
  };

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
        <div className="headingContent mx-[5%] mt-5">
          <div className="w-[100%] flex justify-between items-center">
            <p className="text-[#666666] font-semibold text-[1.5rem]">
              Create Product
            </p>
          </div>
          <div className="w-full h-[2px] bg-primaryColor mt-2"></div>
        </div>
      </div>
      <form className="mx-[5%] flex flex-col gap-10 rounded-xl mt-10 border-[#B9B9B9] font-medium border-[1px] py-16 px-[5%]">
        <div className="flex">
          <div className="w-1/2 flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <label>Title</label>
              <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#FFFFF] w-[90%] h-10 p-5 rounded-md border-[1px] border-[#a9a9a9] font-normal"
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <label>CO2 footprint ( in g )</label>
              <input
                type="text"
                value={cfp}
                required
                onChange={(e) => setcfp(e.target.value)}
                className="bg-[#FFFFF] w-[90%] h-10 p-5 rounded-md border-[1px] border-[#a9a9a9] font-normal"
              ></input>
            </div>
            <div>
              <h3 className="mb-2">Category</h3>
              <ul className="flex flex-wrap gap-2 w-[90%]">
                {optionData.map(({ id, name }) => {
                  return (
                    <li
                      key={id}
                      //   onClick={() => setTopic(name)}
                      className={`py-1 px-2 flex justify-center items-center text-[0.8rem] font-normal cursor-pointer rounded-3xl bg-white border-[1px] border-black hover:border-primaryColor hover:text-primaryColor`}
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
              <input
                type="text"
                value={category}
                required
                readOnly
                className="bg-[#FFFFF] w-[90%] h-10 p-5 rounded-md mt-3 border-[1px] border-[#a9a9a9] font-normal"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label>Description</label>
              <textarea
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#FFFFF] w-[90%] p-5 rounded-md border-[1px] border-[#a9a9a9] font-normal"
              ></textarea>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-10">
            <div className="mt-4">
              <input
                type="file"
                onChangeCapture={(e) => setImg(e.target.files[0])}
                required
                className=" absolute translate-x-[100px] translate-y-[310px] text-[1.1rem]  cursor-pointer text-center font-normal text-primaryColor py-2 px-4 rounded-lg  hover:text-[#007AAF] border-[3px] border-primaryColor"
              ></input>
              <div className="w-[100%] h-[400px] flex justify-center items-center border-[1px] border-[#000000]">
                <UploadImage className="h-[100%]" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label>Price ( in $ )</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="bg-[#FFFFF] w-[100%] h-10 p-5 rounded-md border-[1px] border-[#a9a9a9] font-normal"
              ></input>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="text-[1.3rem] w-44 font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-2 px-4 rounded-lg  hover:bg-[#007AAF] hover:border-[#007AAF] border-[3px] border-primaryColor">
            Submit
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CreateProduct;
