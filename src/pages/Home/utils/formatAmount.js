/**
 * Format a number string (e.g. "1000000.50") to a more readable format (e.g. "1,000,000.50")
 * Returns empty string if input is invalid or empty.
 */
export function formatAmount(amount) {
  if (amount === undefined || amount === null || amount === "") return "";
  // Remove any commas, then parse as float
  const num = Number(String(amount).replace(/,/g, ""));
  if (isNaN(num)) return amount;
  // Format with commas, keep decimals if present
  return num.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatAmountOrNA(amount) {
  if (amount === undefined || amount === null || amount === "") return "N/A";
  return formatAmount(amount);
}
