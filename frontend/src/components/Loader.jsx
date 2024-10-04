import React from "react";

const Loader = ({ count }) => {
  const loaders = Array.from({ length: count }, (_, index) => (
    <div key={index} className="w-[100%] h-full">
      <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
      <div className="bg-gray-300 h-4 rounded-full mt-4 animate-pulse"></div>
      <div className="bg-gray-300 h-4 w-[25%] rounded-full mt-3 animate-pulse"></div>
      <div className="bg-gray-300 h-4 w-[50%] rounded-full mt-3 animate-pulse"></div>
    </div>
  ));

  return <>{loaders}</>;
};

export default Loader;