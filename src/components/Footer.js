import React from "react";
import { Github } from "../assets";

const Footer = () => {
  return (
    <div className="h-14 flex justify-center items-center bg-[#E4F8FF] mt-[4rem]">
      <Github className="h-7 cursor-pointer" /> | Made with ❤️ at ChainLink
      Hackathon
    </div>
  );
};

export default Footer;
