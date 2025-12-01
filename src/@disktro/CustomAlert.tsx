import React from "react";

interface Props {
  message: string;
}
const CustomAlert = ({ message }: Props) => {
  return (
    <div className="bg-red-500/20 border text-center border-red-500/40 rounded-lg p-3 text-white text-sm">
      {message}
    </div>
  );
};

export default CustomAlert;
