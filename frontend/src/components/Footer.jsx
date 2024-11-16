import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black p-2 m-3 rounded-lg">
      <div className="text-center">
        <p className="font-poppins text-white uppercase font-normal">
          Swift Cart v2.0 - Gad Ashell Sususco
        </p>
      </div>
      <div className="text-center text-primary font-poppins">
        <p className="font-poppins text-white font-normal">
          {currentYear} All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
