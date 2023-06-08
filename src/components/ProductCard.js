import React from "react";

const ProductCard = () => {
  return (
    <div className="h-[300px] w-[250px] rounded-2xl overflow-hidden border-[#EDEDED] border-2 cursor-pointer hover:border-primaryColor">
      <div className="bg-[#F5F5F5] h-[190px] w-[100%] flex items-center justify-center">
        <img src={require("../assets/mobile.png")} className="h-[100%]"></img>
      </div>
      <div className="font-semibold flex flex-col justify-start px-3 py-2 gap-1">
        <p>Galaxy M13 (4GB | 64 GB )</p>
        <div className="font-bold flex gap-1">
          <p>₹32999</p>
          <p className="font-normal">₹74999</p>
        </div>
        <div className="w-full h-[2px] bg-[#EDEDED] my-1"></div>
        <p className="text-[#249B3E]">CO2 Footprint - 850g</p>
      </div>
    </div>
  );
};

export default ProductCard;
