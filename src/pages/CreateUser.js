import React, { useEffect } from "react";
import { Footer, Header } from "../components";
import supabase from "../config/supabase";

const CreateUser = () => {
  //   const getUsers = async () => {
  //     const { data, error } = await supabase
  //       .from("Smoothies")
  //       .delete()
  //       .eq("id", test.id)
  //       .select();

  //     if (error) {
  //       console.log(error);
  //     }
  //     if (data) {
  //       console.log(data);
  //       onDelete(test.id);
  //     }
  //   };
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("Users") // Name of Table
        .select()
        .eq("account", "0x562f28a7F5B904a6523FF705881Cb8c60aa794CB");

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
