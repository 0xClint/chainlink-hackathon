import React, { useEffect, useState } from "react";
import { Header, Footer } from "../components";
import { UploadImage } from "../assets";
import supabase from "../config/supabase";
import { ethers } from "ethers";
import Lottie from "react-lottie-player";
import loaderGif from "../assets/loader.json";
import { Link } from "react-router-dom";
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
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
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

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("Products") // Name of Table
        .select();
      // .eq("pid", params.id);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    };
    fetchProducts();
  }, []);

  const insertProduct = async (account) => {
    let { data, error } = await supabase
      .from("Products")
      .insert([
        {
          pid: 8,
          category: "Fashion",
          cfootprint: 5,
          description:
            "Diamond Ring In 18Kt Rose Gold (5.06 gram) with Diamonds (0.3260 Ct)",
          name: "Alsa Diamond Ring",
          price: 200,
          purl: "https://kinclimg7.bluestone.com/f_jpg,c_scale,w_828,q_80,b_rgb:f0f0f0/giproduct/BICM0449R15_RAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-53472.png",
          seller: "0xe468c2035adD65e1Feafeb6Ba4695990f7AB8F17",
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

  const createProduct = async (e) => {
    e.preventDefault();

    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    // const tx = await contract.addProduct(
    //   7,
    //   account,
    //   ethers.utils.parseEther(`${50 / 1000000}`)
    // );
    // const receipt = await tx.wait();
    // console.log(receipt);

    await insertProduct(account);
    setLoader(false);
  };

  return (
    <div>
      {success && (
        <div
          className="fixed w-screen h-[100%] bg-slate-500 flex justify-center items-center -z-1"
          style={{ background: "rgba(0, 0, 0, 0.27)" }}
        >
          <div className="z-1000 w-[400px] text-center  bg-[#ffffff] rounded-xl py-10 px-10 flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col justify-center items-center">
              <h2 className=" text-[1.5rem] mb-2">Creation Successful</h2>
              <p className="font-medium w-[70%] ">
                You successfully created product
              </p>
            </div>
            <img
              src={require("../assets/success.png")}
              className="h-32 mb-2"
            ></img>
            <div>
              <Link to={`/orders`}>
                <button
                  // onClick={() => userPetitionSign()}
                  className="bg-primaryColor text-[#ffffff] text-white py-2 px-6 w-52 rounded-[5px] text-[1.1rem] hover:bg-[#007AAF]"
                >
                  Track your Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
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
        <div className="headingContent mx-[5%] mt-5">
          <div className="w-[100%] flex justify-between items-center">
            <p className="text-[#666666] font-semibold text-[1.5rem]">
              Create Product
            </p>
          </div>
          <div className="w-full h-[2px] bg-primaryColor mt-2"></div>
        </div>
      </div>
      <form
        onSubmit={createProduct}
        className="mx-[5%] flex flex-col gap-10 rounded-xl mt-10 border-[#B9B9B9] font-medium border-[1px] py-16 px-[5%]"
      >
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
                      onClick={() => setCategory(name)}
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
          <button
            // type="submit"
            onClick={(e) => createProduct(e)}
            className="text-[1.3rem] w-44 font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-2 px-4 rounded-lg  hover:bg-[#007AAF] hover:border-[#007AAF] border-[3px] border-primaryColor"
          >
            Submit
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CreateProduct;
