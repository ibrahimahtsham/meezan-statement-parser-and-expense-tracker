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

<!-- Add screenshots of the app below. For example: -->
<!-- ![Upload CSV Page](screenshots/upload-page.png) -->
<!-- ![Statistics Dashboard](screenshots/stats-dashboard.png) -->

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
