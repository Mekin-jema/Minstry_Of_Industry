import multer from "multer";
import csv from "csv-parser";
import { Readable } from "stream";

// Multer setup for in-memory file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Read and process CSV file from the frontend
const uploadFile = async (req, res) => {
  try {
    const results = [];
    const columns = Array.isArray(req.query.column) ? req.query.column : req.query.column?.split(",");
    const uploadedFile = req.file; // Renamed from `file` to `uploadedFile` for clarity

    // Ensure file is uploaded
    if (!uploadedFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert file buffer to a readable stream
    const stream = Readable.from(uploadedFile.buffer.toString("utf-8"));

    // Parse CSV data
    await new Promise((resolve, reject) => {
      stream
        .pipe(
          csv({
            separator: ",",
            escape: '"',
            mapHeaders: ({ header }) => header.trim(), // Keep headers as they are (no replacement)
            mapValues: ({ value }) => value.trim(), // Trim values
          })
        )
        .on("data", (data) => results.push(data)) // Collect rows
        .on("end", () => resolve()) // Resolve when parsing is complete
        .on("error", (error) => reject(error)); // Handle errors
    });

    // If specific columns are requested, filter results
    if (columns && columns.length > 0) {
      // Check if requested columns exist in the CSV data
      const invalidColumns = columns.filter(
        (col) => !results.length || !Object.prototype.hasOwnProperty.call(results[0], col)
      );

      if (invalidColumns.length > 0) {
        return res.status(400).json({ message: `Invalid column names: ${invalidColumns.join(", ")}` });
      }

      // Filter results to include only the requested columns
      const filteredResults = results.map((row) =>
        columns.reduce((obj, col) => {
          obj[col] = row[col] || ""; // Ensure empty values are still present
          return obj;
        }, {})
      );
      return res.json({ data: filteredResults });
    }

    // Return full data if no columns are specifi
    return res.json({ data: results });

  } catch (error) {
    return res.status(500).json({ message: "Error reading file" });
  }
};

export { upload, uploadFile };
