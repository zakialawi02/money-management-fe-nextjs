# 🗃️ Money Management / Expense Tracker Application

This is a frontend project for a Money Management Application or expense tracker
built using [Next.js](https://nextjs.org/). This application allows users to
track income and expenses, manage various financial accounts, and visualize
their transaction data.

## 🚀 Key Features

- **User Authentication**: A secure registration and login system for users.
- **Pocket Account Management**: Users can create, view, edit, and delete
  multiple financial accounts.
- **Transaction Recording**: Easily record income and expenses, complete with
  date, amount, description, and category.
- **Data Visualization**: View transaction summaries in interactive pie charts,
  grouped by type or category.
- **Transaction Reports**:
- Export monthly transaction summaries to PDF format.
- Share transaction reports via a unique link (Stream Report).
- **Light & Dark Themes**: Customizable interface with light or dark mode.
- **Responsive Design**: User-friendly interface accessible on various devices.

## 🛠️ Technology Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [neobrutalism](https://www.neobrutalism.dev/),[shadcn/ui] (https://ui.shadcn.com/), and [Lucide React](https://lucide.dev/) (for icons).
- **Form Management**: [UseStateAction Nextjs]
- **Data Visualization**: [ECharts for React](https://github.com/hustcc/echarts-for-react)

## 🚀 Getting Started

To run this project in your local environment, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18.18.0 or higher is recommended)
- A package manager such as `npm`, `yarn`, or `pnpm`

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/zakialawi02/money-management-fe-nextjs.git](https://github.com/zakialawi02/money-management-fe-nextjs.git)
    cd money-management-fe-nextjs
    ```

2.  **Install dependencies:**

```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
```

### Environment Configuration

This project requires a connection to the backend API. Create a `.env.local` file in the project root and add the following environment variables:
`NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`

Replace the URL with your backend API address if it differs.

### Running the Development Server

Run the following command to start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to see the results.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.

## Support and Donations

If you find this project useful and would like to support its further
development, you can make a donation via the following platforms:

https://ko-fi.com/zakialawi

Every contribution you make is greatly appreciated. Thank you!
