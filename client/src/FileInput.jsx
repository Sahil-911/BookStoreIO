import React from "react";
import * as XLSX from "xlsx";
import TableView from "./TableView";

const isValidString = (value) => {
  return typeof value === "string" && value.trim() !== "";
};

const isValidISBN = (isbn) => {
  let regex = new RegExp(
    /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/
  );

  if (isbn == null) {
    return false;
  }

  return regex.test(isbn);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDate = (date) => {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(date);
};

const validateRow = (row, index) => {
  if (!isValidString(row.Name)) {
    alert("Invalid Name " + row.Name + " at row " + index);
    return false;
  }
  if (!isValidISBN(row.ISBNCode)) {
    alert("Invalid ISBN " + row.ISBNCode + " at row " + index);
    return false;
  }
  if (!isValidString(row["Author Id"])) {
    alert("Invalid Author Id " + row["Author Id"] + " at row " + index);
    return false;
  }
  if (!isValidString(row.Author)) {
    alert("Invalid Author " + row.Author + " at row " + index);
    return false;
  }

  if (!isValidEmail(row["Author Email"])) {
    alert("Invalid Author Email " + row["Author Email"] + " at row " + index);
    return false;
  }

  if (!isValidDate(row["Date of Birth"])) {
    alert("Invalid Date of Birth " + row["Date of Birth"] + " at row " + index);
    return false;
  }

  return true;
};

function FileInput() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [finalData, setFinalData] = React.useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.name.endsWith(".xlsx")) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const workbook = XLSX.read(event.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(sheet);

          const validatedData = sheetData.map((row, index) => {
            if (validateRow(row, index)) {
              return { ...row, validation: "Valid" };
            } else {
              return { ...row, validation: `Invalid data at row ${index + 1}` };
            }
          });

          setData(validatedData);
          setError(null);
        } catch (err) {
          setError(
            "Error processing file. Please ensure it is a valid Excel file."
          );
          setData(null);
        }
      };

      reader.readAsBinaryString(file);
    } else {
      setError("Please upload a valid Excel file.");
      setData(null);
    }
  };

  const handleSubmit = async () => {
    if (data) {
      const validData = data.filter((row) => row.validation === "Valid");

      try {
        await submitData(validData);
        alert("Data submitted successfully!");
      } catch (err) {
        alert("Error submitting data: " + err.message);
      }
    }
  };

  const submitData = async (validData) => {
    try {
      const response = await fetch("https://bookstoreio.onrender.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit data: ${response.statusText}`);
      }

      const result = await response.json();
      setFinalData(validData);
      console.log("Data submitted successfully:", result);

      return result;
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error;
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && !finalData && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleSubmit}>Submit Data</button>
        </div>
      )}
      {finalData && <TableView data={finalData} />}
    </div>
  );
}

export default FileInput;
