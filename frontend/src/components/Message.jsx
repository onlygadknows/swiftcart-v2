import React from "react";

const Message = ({ variant, message }) => {
  return (
    <div
      role="alert"
      class={`mt-3 relative flex w-full p-3 text-sm ${variant} bg-black rounded-md`}
    >
      {message}
      
    </div>
  );
};

Message.defaultProps = {
  variant: "text-white",
};

export default Message;
