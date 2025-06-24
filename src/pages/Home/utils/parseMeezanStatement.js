import * as XLSX from "xlsx";

export function parseMeezanStatement(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });

  // Extract header info
  const accountNumber = rows[0]?.[0]?.replace(/[^\d]/g, "") || "";
  const accountHolder = rows[0]?.[1] || "";
  const openingBalance = rows[1]?.[2]?.trim() || "";
  const closingBalance = rows[2]?.[2]?.trim() || "";
  const currency = rows[3]?.[1] || "";

  // Find the index of the transaction table header
  const txHeaderIdx = rows.findIndex(
    (row) =>
      row[0]?.toString().toLowerCase().includes("booking date") &&
      row[1]?.toString().toLowerCase().includes("value date")
  );

  // Extract transactions
  const txRows = rows.slice(txHeaderIdx + 1).filter((row) => row.length > 1);
  const transactions = txRows.map((row) => ({
    bookingDate: row[0],
    valueDate: row[1],
    docNo: row[2],
    description: row[3],
    debit: row[4],
    credit: row[5],
    availableBalance: row[6],
  }));

  return {
    accountNumber,
    accountHolder,
    openingBalance,
    closingBalance,
    currency,
    transactions,
  };
}
