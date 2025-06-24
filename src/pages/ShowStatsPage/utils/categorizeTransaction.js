const CATEGORY_KEYWORDS = [
  {
    category: "Food",
    keywords: ["FOOD PANDA", "SWEET CREME", "BAKEMAN BAKERS"],
  },
  {
    category: "Groceries",
    keywords: [
      "METRO ISLAMABAD",
      "D WATSON",
      "D WATSON CHEMIST",
      "D WATSON POS",
      "KRLF PHAMRACY",
      "SIMPLY SUFI",
      "FRAGRANCE STORE",
    ],
  },
  {
    category: "Online Shopping",
    keywords: [
      "aliexpress",
      "AliExpress.com",
      "WWW.ALIEXPRESS.COM",
      "Daraz",
      "APG*STEAMSHOP",
      "Online Purchase",
    ],
  },
  { category: "Mobile Bill", keywords: ["Bill Paid", "UFONE", "ZONG", "JAZZ"] },
  { category: "Utilities", keywords: ["KUICKPAY", "1BILL - INVOICES"] },
  { category: "Bank Charges", keywords: ["BANK CHARGES"] },
  {
    category: "ATM Withdrawal",
    keywords: ["ATM Cash Withdrawal", "1-Link ATM Cash Withdrawa"],
  },
  {
    category: "Transfer Out",
    keywords: [
      "Money Transferred",
      "Raast P2P Fund transfer to",
      "Money Transferred To",
      "Raast P2M to",
    ],
  },
  {
    category: "Transfer In",
    keywords: [
      "Raast P2P Fund transfer from",
      "Money Received",
      "Batch Transfer - Credit FUND TRF",
    ],
  },
  { category: "Profit", keywords: ["Payment of Profit"] },
  {
    category: "Tax",
    keywords: [
      "Withholding Tax",
      "FED AMOUNT",
      "FBRTax",
      "Charges Taxes Plus FED",
    ],
  },
  {
    category: "Annual Fees",
    keywords: ["VISA ANNUAL FEE", "SMS ANNUAL FEE", "MASTERCARD ANNUAL FEE"],
  },
  { category: "Fitness/Health", keywords: ["Smart Fit"] },
  { category: "Shopping", keywords: ["POS Purchase"] },
  { category: "Other", keywords: [] },
];

export default function categorizeTransaction(description) {
  for (const { category, keywords } of CATEGORY_KEYWORDS) {
    if (
      keywords.some((kw) =>
        description.toUpperCase().includes(kw.toUpperCase())
      )
    ) {
      return category;
    }
  }
  return "Other";
}
