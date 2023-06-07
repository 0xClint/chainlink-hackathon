import React from "react";
import {
  ProductCard,
  CategoryCard,
  Slider,
  Header,
  Footer,
} from "../components";
import { ArrowRight } from "../assets";
import { Link } from "react-router-dom";

const cardData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  // { id: 6 },
];

const Home = () => {
  return (
    <div>
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
        <Slider />
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
          <div className="cardContainer w-[100%] flex justify-center gap-5 my-5">
            {cardData.map(({ id }) => {
              return <ProductCard key={id} />;
            })}
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
          <div className="cardContainer w-[100%] flex justify-center gap-5 my-5">
            {cardData.map(({ id }) => {
              return <ProductCard key={id} />;
            })}
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
