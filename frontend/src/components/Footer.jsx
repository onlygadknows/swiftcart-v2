import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black p-2">
      <div className="text-center text-primary font-poppins">
        Swift Cart v2.0 - Gad Ashell Sususco
      </div>
      <div className="text-center text-primary font-poppins">
        {currentYear} All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
