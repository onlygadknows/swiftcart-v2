import React from "react";

const Message = ({ variant, message }) => {
  return (
  
     <div className="bg-red-50 mt-6 border-s-4 border-red-500 p-4" role={variant} tabindex="-1" aria-labelledby="hs-bordered-red-style-label">
     <div className="flex">
       <div className="shrink-0">
         <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800">
           <svg className="shrink-0 size-4 animate-ping" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M18 6 6 18"></path>
             <path d="m6 6 12 12"></path>
           </svg>
         </span>
       </div>
       <div className="ms-3 flex items-center justify-center">
         <h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold ">
         {message}
         </h3>
       </div>
     </div>
   </div>
  );
};

Message.defaultProps = {
  variant: "text-white",
};

export default Message;
