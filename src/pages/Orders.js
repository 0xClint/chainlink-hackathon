import React, { useEffect } from "react";
import { Footer, Header } from "../components";
import supabase from "../config/supabase";

const Orders = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("Orders") // Name of Table
        // .select()
        // .select(
        //   `Users (name,address),Products (name,price,category,description,cfootprint,purl,seller)`
        // )
        .select(`*,Products (*)`)
        .eq("user", "0x562f28a7F5B904a6523FF705881Cb8c60aa794CB");

      if (error) {
        // setFetchError("Could not fetch Users");
        // setTests(null);
        console.log(error);
      }
      if (data) {
        // setTests(data);
        console.log(data);
        // setFetchError(null);
      }
    };
    fetchUsers();
  }, []);
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
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
