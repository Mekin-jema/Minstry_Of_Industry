import axios from "axios";

const fetchCSVFile = async (selectedColumns, formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/upload",
      formData,
      {
        params: { column: selectedColumns.join(",") }, // Join columns into a comma-separated string
        responseType: "json", // For handling JSON data
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching CSV file:", error);
    throw error;
  }
};

export default fetchCSVFile;