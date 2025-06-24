# Meezan Statement Parser & Expense Tracker

A web application to parse Meezan Bank CSV statement files and visualize your personal expenses, income, and account trends with interactive charts.

## Features

- **CSV Upload:** Import your Meezan Bank statement in CSV format.
- **Account Overview:** See account holder, number, balances, and currency.
- **Summary:** View total debits, credits, transaction count, and spending/income ratio.
- **Category Breakdown:** Automatic categorization of expenses with pie charts.
- **Balance Over Time:** Visualize your account balance history.
- **Net Change Chart:** Track cumulative net change in your account.
- **Spending Heatmap:** See daily spending patterns on a calendar heatmap.
- **Top Expenses:** Identify your largest expenses.
- **Monthly Trends:** Compare monthly spending and income.

## Screenshots

### 1. Upload CSV Page

![Upload CSV Page](https://github.com/user-attachments/assets/fe33f2c2-af9f-4154-b50c-f101805c6b9a)

---

### 2. Statistics Dashboard

- **Expense Category Breakdown**

  ![Expense Category Breakdown](https://github.com/user-attachments/assets/87b8f8b2-612e-4506-8dcc-6a592d637920)

- **Balance Over Time**

  ![Balance Over Time](https://github.com/user-attachments/assets/c027eca7-3a5f-4e0a-b381-47c2b0b190bb)

- **Top 5 Expenses**

  ![Top 5 Expenses](https://github.com/user-attachments/assets/f0c9e7f6-3a45-4f2f-98df-93fa79e0b6ee)

- **Monthly Spending & Income**

  ![Monthly Spending & Income](https://github.com/user-attachments/assets/5f9ffd8e-7b63-4551-a0f8-0311854be1f1)


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/meezan-statement-parser-and-expense-tracker.git
   cd meezan-statement-parser-and-expense-tracker
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### Deployment

To deploy to GitHub Pages:

```sh
npm run deploy
```

## How to Export Your Meezan Statement as CSV

1. Open the Meezan Bank mobile app.
2. Go to **Transactions**.
3. Tap the **Download** button and select **CSV** format.
4. Choose your desired date range and download the file.
5. Open the CSV in Google Sheets or Excel if needed, then upload it to this app.

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Chart.js](https://www.chartjs.org/)
- [react-calendar-heatmap](https://github.com/patientslikeme/react-calendar-heatmap)

## License

MIT
