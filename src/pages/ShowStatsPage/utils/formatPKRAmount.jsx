/**
 * Format a number string (e.g. "175054.79") to "175,054 PKR"
 * Returns "N/A" if input is invalid or empty.
 */
export function formatPKRAmount(amount) {
  if (amount === undefined || amount === null || amount === "") return "N/A";
  // Remove any commas, then parse as float
  const num = Number(String(amount).replace(/,/g, ""));
  if (isNaN(num)) return "N/A";
  // Format with commas, no decimals, add PKR
  return `${num.toLocaleString("en-PK", { maximumFractionDigits: 0 })} PKR`;
}
