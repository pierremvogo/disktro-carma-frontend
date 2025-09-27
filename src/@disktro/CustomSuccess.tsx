import React from "react";

interface Props {
  message: string;
}
const CustomSuccess = ({ message }: Props) => {
  return (
    <div className="p-3 px-2 bg-green-100 text-green-700 rounded-md my-4 italic text-center">
      {message}
    </div>
  );
};

export default CustomSuccess;
