import React from "react";
import { Footer, Header } from "../components";

const CreateUser = () => {
  return (
    <div>
      <Header />
      <Footer />
      <div className="mx-[5%]">
        <div>
          <label>Name</label>
          <input
            type="text"
            className="bg-[#F3F9FB] w-[200px] h-10 p-5 rounded-md"
          ></input>
        </div>
        <div>
          <label>Physical Address</label>
          <input
            type="text"
            className="bg-[#F3F9FB] w-[200px] h-10 p-5 rounded-md"
          ></input>
        </div>
        <div>
          <label>carbon rating</label>
          <input
            type="text"
            className="bg-[#F3F9FB] w-[200px] h-10 p-5 rounded-md"
          ></input>
        </div>
        <button className="text-[1.3rem] font-medium cursor-pointer text-[#ffffff] text-center bg-primaryColor py-3 px-4 rounded-lg  hover:bg-[#007AAF]">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
