function sumAmounts(transactions, key) {
  return transactions
    .map((t) => parseFloat(t[key] || "0"))
    .reduce((a, b) => a + b, 0);
}

export default sumAmounts;
