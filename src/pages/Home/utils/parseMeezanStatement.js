import * as XLSX from "xlsx";
import { parseDate } from "./parseDate";

export function parseMeezanStatement(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });

  // Helper to extract currency and amount
  function parseBalance(cell) {
    if (!cell) return { currency: "", amount: "" };
    const match = cell.match(/^([A-Za-z]+)\s+([\d,]+\.\d{2})$/);
    if (match) {
      return { currency: match[1], amount: match[2] };
    }
    return { currency: "", amount: cell };
  }

  // Extract header info
  const accountNumber = rows[0]?.[0]?.replace(/[^\d]/g, "") || "";
  const accountHolder = rows[0]?.[1] || "";

  const opening = parseBalance(rows[1]?.[1]);
  const closing = parseBalance(rows[2]?.[1]);
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
    bookingDate: parseDate(row[0]),
    valueDate: parseDate(row[1]),
    docNo: row[2],
    description: row[3],
    debit: row[4],
    credit: row[5],
    availableBalance: row[6],
  }));

  return {
    accountNumber,
    accountHolder,
    openingBalance: opening.amount,
    openingCurrency: opening.currency,
    closingBalance: closing.amount,
    closingCurrency: closing.currency,
    currency,
    transactions,
  };
}
