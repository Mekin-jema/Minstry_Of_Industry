import React, { createContext, useState } from "react";
import axios from "axios";
import Papa from "papaparse"; // Import papaparse for CSV parsing

// Create a context
export const CSVContext = createContext();

// Create a provider component
export const CSVProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]); // All columns from the CSV
  const [selectedColumns, setSelectedColumns] = useState([]); 
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Parse the CSV file to extract columns
    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          if (result.data.length > 0) {
            const columns = Object.keys(result.data[0]);
            setColumns(columns);
            setSelectedColumns([]); // ✅ Start with an empty selection (checkboxes unchecked)
          }
        },
        error: (err) => {
          console.error("Error parsing CSV file:", err);
          setError("Error parsing CSV file. Please check the file format.");
        },
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data.data);
      setError("");
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Error uploading file. Please try again.");
    }
  };

  const handleColumnSelection = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  return (
    <CSVContext.Provider
      value={{
        file,
        data,
        columns,
        selectedColumns,
        error,
        handleFileChange,
        handleUpload,
        handleColumnSelection,
      }}
    >
      {children}
    </CSVContext.Provider>
  );
};

export default CSVProvider;
