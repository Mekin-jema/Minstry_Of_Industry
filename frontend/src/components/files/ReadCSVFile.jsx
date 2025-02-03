import React, { useContext } from "react";
import { CSVContext } from "../helpers/CSVContext.jsx";

const ReadCSVFile = () => {
  const { data, columns,selectedColumns, isLoading } = useContext(CSVContext);

  // Debugging logs
  console.log("CSV Data:", data);
  console.log("Selected Columns:", selectedColumns);

  if (isLoading) {
    return <p className="text-center text-blue-500">Uploading file, please wait...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No file is available.</p>;
  }

  return (
    <div className="overflow-x-auto p-5 bg-gray-50 rounded-lg shadow-md w-4/5 mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">CSV Data</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {selectedColumns.length>0 ? selectedColumns.map((col, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                {col.replace(/_/g, " ")}
              </th>
            ))
            :
            columns.map((col, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                {col.replace(/_/g, " ")}
              </th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
              {selectedColumns.length>0 ? selectedColumns.map((col, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                  {row[col] !== undefined ? row[col] : "N/A"}
                </td>
              ))
              :
             columns.map((col, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                  {row[col] !== undefined ? row[col] : "N/A"}
                </td>
              ))             
            }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadCSVFile;