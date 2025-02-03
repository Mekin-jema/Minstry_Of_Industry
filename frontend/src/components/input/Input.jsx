import React from "react";

const InputField = ({ type, id, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-4">
      {/* Input Field */}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 
        focus:ring-[#214394] focus:border-[#214394] transition-all duration-200
        ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 hover:shadow-md"
        }`}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;