import React, { useContext } from "react";
import { CSVContext } from "../helpers/CSVContext.jsx";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const { columns, selectedColumns, error, handleFileChange, handleUpload, handleColumnSelection } =
    useContext(CSVContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    handleUpload();
    navigate("/data");
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-50 rounded-lg shadow-md w-4/5 mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Upload CSV File</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-5 p-2 rounded border border-gray-300"
      />

      {columns.length > 0 && (
        <div className="flex flex-col items-center mb-5">
          <h3 className="text-xl font-semibold mb-3">Select Columns</h3>
          <div className="flex flex-wrap justify-between items-center pl-6 pr-2 border border-gray-500 rounded-lg">
            {columns.map((column, index) => (
              <label key={index} className="flex items-center m-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleColumnSelection(column)}
                  className="mr-2"
                />
                {column.replace(/_/g, " ")}
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-96 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Display
      </button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default UploadFile;