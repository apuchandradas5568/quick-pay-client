import React from "react";

const TransactInputBox = ({ value, title, setValue }) => {
  return (
    <>
      <input
        type="number"
        placeholder={title}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
    </>
  );
};

export default TransactInputBox;
