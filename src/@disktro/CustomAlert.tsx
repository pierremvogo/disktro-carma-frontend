import React from "react";

interface Props {
  message: string;
}
const CustomAlert = ({ message }: Props) => {
  return (
    <div className="p-3 px-2 bg-red-100 rounded-xs my-4 italic text-red-500 text-center">
      {message}
    </div>
  );
};

export default CustomAlert;
