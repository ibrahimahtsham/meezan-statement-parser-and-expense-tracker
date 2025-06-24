// Simple CSV parser (handles quoted fields and commas)
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (field !== "" || row.length > 0) row.push(field);
      if (row.length > 0) rows.push(row);
      row = [];
      field = "";
      if (char === "\r" && text[i + 1] === "\n") i++; // handle \r\n
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length > 0) row.push(field);
  if (row.length > 0) rows.push(row);
  return rows;
}

export function parseMeezanStatement(csvText) {
  const rows = parseCSV(csvText).filter((r) => r.length > 0);

  // Remove BOM if present
  if (rows[0][0]?.charCodeAt(0) === 0xfeff) {
    rows[0][0] = rows[0][0].slice(1);
  }

  // Extract header info
  const accountNumber = rows[0]?.[0]?.replace(/[^\d]/g, "") || "";
  const accountHolder = rows[0]?.[1] || "";

  function parseBalance(cell) {
    if (!cell) return { currency: "", amount: "" };
    const match = cell.match(/^([A-Za-z]+)\s+([\d,]+\.\d{2})$/);
    if (match) {
      return { currency: match[1], amount: match[2] };
    }
    // Try PKR      175054.79
    const altMatch = cell.match(/^([A-Za-z]+)\s+([\d,.]+)$/);
    if (altMatch) {
      return { currency: altMatch[1], amount: altMatch[2] };
    }
    return { currency: "", amount: cell };
  }

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
    openingBalance: opening.amount,
    openingCurrency: opening.currency,
    closingBalance: closing.amount,
    closingCurrency: closing.currency,
    currency,
    transactions,
  };
}
