import React from "react";

interface Props {
  message: string;
}
const CustomSuccess = ({ message }: Props) => {
  return (
    <div className="bg-green-500/20 border text-center border-green-500/40 rounded-lg p-3 text-white text-sm">
      {message}
    </div>
  );
};

export default CustomSuccess;
