import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Convert __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readCSVFile = async (req, res) => {
  try {
    const results = [];
    let columns = req.query.column;

    const filePath = path.join(__dirname, "../country_full.csv");

    // Check if the file exists before reading
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "CSV file not found" });
    }

    // Normalize column names (convert to array and process)
    if (columns) {
      if (!Array.isArray(columns)) {
        columns = [columns]; // Convert single string to array
      }
      columns = columns.map((col) => col.toLowerCase().replace(/\s+/g, "_"));
    }

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(
          csv({
            separator: ",",
            escape: '"',
            mapHeaders: ({ header }) =>
              header.trim().toLowerCase().replace(/\s+/g, "_"), // Normalize header
            mapValues: ({ value }) => value.trim(),
          })
        )
        .on("data", (data) => results.push(data))
        .on("end", () => resolve())
        .on("error", (error) => reject(error));
    });

    // If specific columns are requested, filter results
    if (columns) {
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

    // Return full data if no columns are specified
    return res.json({ data: results });
  } catch (error) {
    console.error("Error reading file:", error);
    return res.status(500).json({ message: "Error reading file" });
  }
};

export default readCSVFile;