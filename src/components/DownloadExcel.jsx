"use client";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PiMicrosoftExcelLogoThin } from "react-icons/pi";

const DownloadExcel = ({ data, fileName }) => {
  const downloadExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      alert("No data to export!");
      return;
    }

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write workbook to binary array
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob and trigger download
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  };

  return (
    <div>
      <button
        onClick={downloadExcel}
        className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-sm transition-all duration-300 cursor-pointer"
      >
        <PiMicrosoftExcelLogoThin size={20} />
        Download
      </button>
    </div>
  );
};

export default DownloadExcel;
