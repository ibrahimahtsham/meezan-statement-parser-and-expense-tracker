export async function mergeCsvFiles(files) {
  // Read all files as text
  const texts = await Promise.all(
    files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => resolve(evt.target.result);
          reader.readAsText(file);
        })
    )
  );

  // Parse each file into lines
  const parsed = texts.map((text) =>
    text.split(/\r?\n/).filter((line) => line.trim() !== "")
  );

  // Account info: first 4 lines from the first file
  const accountInfo = parsed[0].slice(0, 4);

  // Opening balance: from first file, line 2
  const openingBalance = parsed[0][1];

  // Closing balance: from last file, line 3
  const closingBalance = parsed[parsed.length - 1][2];

  // Currency: from first file, line 4
  const currency = parsed[0][3];

  // Header row (columns): always line 5 (index 4)
  const header = parsed[0][4];

  // Collect all transaction rows (lines after header, i.e., index >= 5)
  const transactions = [];
  for (let i = 0; i < parsed.length; i++) {
    // For first file, take all lines after header
    // For others, skip first 5 lines (account info + header)
    const startIdx = 5;
    transactions.push(...parsed[i].slice(startIdx));
  }

  // Remove any accidental duplicate header rows in transactions
  const filteredTransactions = transactions.filter(
    (line) => !line.startsWith("Booking Date")
  );

  // Compose merged CSV
  const mergedCsv = [
    accountInfo[0],
    openingBalance,
    closingBalance,
    currency,
    header,
    ...filteredTransactions,
  ].join("\n");

  return mergedCsv;
}
