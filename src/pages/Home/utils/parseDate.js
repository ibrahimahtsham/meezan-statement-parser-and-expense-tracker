// Parses a date value from Meezan statement to YYYY-MM-DD string
export function parseDate(dateVal) {
  if (!dateVal) return dateVal;
  // If it's a number, treat as Excel serial date
  if (typeof dateVal === "number") {
    // Excel's epoch starts at 1899-12-30
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const ms = dateVal * 24 * 60 * 60 * 1000;
    const date = new Date(excelEpoch.getTime() + ms);
    // Format as YYYY-MM-DD
    return date.toISOString().slice(0, 10);
  }
  if (typeof dateVal === "string") {
    // Try DD-MM-YYYY
    let match = dateVal.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (match) {
      return `${match[3]}-${match[2]}-${match[1]}`;
    }
    // Try DD MMM YYYY (e.g., 24 Jun 2024)
    match = dateVal.match(/^(\d{2})\s([A-Za-z]{3})\s(\d{4})$/);
    if (match) {
      const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      const mm = months[match[2]] || "01";
      return `${match[3]}-${mm}-${match[1]}`;
    }
  }
  return dateVal;
}
