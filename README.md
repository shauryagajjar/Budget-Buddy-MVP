<div align="center">

# 💰 Budget Buddy

### *Take control of your money. Finally.*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

<br/>

**Budget Buddy** is a full-stack personal finance web app built to make managing money simple, visual, and actually enjoyable. Track every rupee, set smart budgets, visualize spending patterns, and hit your savings goals — all from one beautiful dashboard.

<br/>

[🚀 **Live Demo**](#) &nbsp;·&nbsp; [🐛 **Report a Bug**](../../issues/new?template=bug_report.md) &nbsp;·&nbsp; [✨ **Request Feature**](../../issues/new?template=feature_request.md)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔌 API Reference](#-api-reference)
- [🌍 Environment Variables](#-environment-variables)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 💸 Money Tracking
- Log **income and expenses** with custom categories, tags, and notes
- Support for **recurring transactions** — subscriptions, rent, salary auto-logged
- Full **transaction history** with search, filter by date/category/amount
- **Bulk import** transactions via CSV

### 📊 Analytics & Insights
- **Interactive dashboard** with monthly overview at a glance
- **Line charts** for income vs. expense trends over time
- **Pie/donut charts** for category-wise spending breakdown
- **Spending heatmap** — see which days you spend the most
- Month-over-month **comparison reports**

### 🎯 Budgets & Goals
- Set **monthly budgets** per category with real-time progress bars
- Visual **savings goal cards** — track progress toward specific targets
- **Smart alerts** when you're approaching a budget limit
- **Net worth tracker** — assets vs. liabilities snapshot

### 🔧 Core Experience
- 🌙 **Dark / Light mode** — fully themed, easy on the eyes
- 📱 **Fully responsive** — works seamlessly on mobile, tablet, and desktop
- 🔒 **Secure authentication** — JWT with refresh token rotation
- 📤 **Export data** — download reports as CSV or PDF
- 🔔 **Bill reminders** — never miss a due date

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Why |
|:------|:-----------|:----|
| **Frontend** | React 18 + Vite | Fast dev server, instant HMR |
| **Styling** | Tailwind CSS | Utility-first, consistent design |
| **Charts** | Recharts + D3.js | Beautiful, responsive data viz |
| **State** | Zustand + React Query | Lightweight, powerful async state |
| **Backend** | Node.js + Express | Fast REST API, great ecosystem |
| **Database** | MongoDB Atlas | Flexible schema, free tier |
| **Auth** | JWT + bcrypt | Stateless, secure, industry standard |
| **Deployment** | Vercel (FE) + Railway (BE) | Zero config, free tier |

</div>

---

## ⚙️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (React)                 │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages   │  │Components│  │ Zustand Store │  │
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       └─────────────┴────────────────┘           │
│                   React Query                    │
└──────────────────────┬──────────────────────────┘
                       │ HTTP / REST
┌──────────────────────▼──────────────────────────┐
│               Server (Express + Node)            │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐  │
│  │  Routes  │  │ Controllers│  │  Middleware │  │
│  └──────────┘  └────────────┘  └─────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ Mongoose ODM
┌──────────────────────▼──────────────────────────┐
│               MongoDB Atlas (Cloud)              │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node  >= 18.0.0
npm   >= 9.0.0
```

You'll also need a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

---

### 1 · Clone the repo

```bash
git clone https://github.com/yourusername/budget-buddy.git
cd budget-buddy
```

### 2 · Install dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3 · Configure environment variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in your values — see [Environment Variables](#-environment-variables) below.

### 4 · Start the development servers

```bash
# Terminal 1 — Backend (runs on :5000)
cd server && npm run dev

# Terminal 2 — Frontend (runs on :5173)
cd client && npm run dev
```

### 5 · Open in your browser

```
http://localhost:5173
```

> 🎉 Register an account and start tracking!

---

## 📁 Project Structure

```
budget-buddy/
│
├── 📂 client/                        # React frontend (Vite)
│   ├── 📂 src/
│   │   ├── 📂 components/            # Reusable UI components
│   │   │   ├── 📂 charts/            # Recharts wrappers
│   │   │   ├── 📂 forms/             # Input forms
│   │   │   └── 📂 layout/            # Sidebar, Navbar, etc.
│   │   ├── 📂 pages/                 # Route-level pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Budgets.jsx
│   │   │   └── Goals.jsx
│   │   ├── 📂 hooks/                 # Custom React hooks
│   │   ├── 📂 store/                 # Zustand state slices
│   │   ├── 📂 services/              # API call functions
│   │   └── 📂 utils/                 # Formatters, helpers
│   └── vite.config.js
│
├── 📂 server/                        # Express backend
│   ├── 📂 controllers/               # Business logic per route
│   ├── 📂 models/                    # Mongoose schemas
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── Budget.js
│   │   └── Goal.js
│   ├── 📂 routes/                    # Express routers
│   ├── 📂 middleware/                # Auth guard, error handler
│   ├── 📂 utils/                     # Token helpers, validators
│   └── server.js
│
└── README.md
```

---

## 🔌 API Reference

<details>
<summary><b>🔐 Auth &nbsp;—&nbsp; <code>/api/v1/auth</code></b></summary>

<br/>

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/register` | ❌ | Create a new account |
| `POST` | `/login` | ❌ | Login, receive access + refresh token |
| `POST` | `/refresh` | ❌ | Rotate refresh token |
| `POST` | `/logout` | ✅ | Invalidate session |
| `GET`  | `/me` | ✅ | Get authenticated user profile |

</details>

<details>
<summary><b>💸 Transactions &nbsp;—&nbsp; <code>/api/v1/transactions</code></b></summary>

<br/>

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET`    | `/` | ✅ | List all transactions (paginated, filterable) |
| `POST`   | `/` | ✅ | Create a new transaction |
| `GET`    | `/:id` | ✅ | Get single transaction |
| `PUT`    | `/:id` | ✅ | Update a transaction |
| `DELETE` | `/:id` | ✅ | Delete a transaction |
| `GET`    | `/summary` | ✅ | Monthly income/expense summary |
| `POST`   | `/import` | ✅ | Bulk import via CSV |

</details>

<details>
<summary><b>📅 Budgets &nbsp;—&nbsp; <code>/api/v1/budgets</code></b></summary>

<br/>

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET`    | `/` | ✅ | Get all budgets |
| `POST`   | `/` | ✅ | Create a budget |
| `PUT`    | `/:id` | ✅ | Update a budget |
| `DELETE` | `/:id` | ✅ | Delete a budget |
| `GET`    | `/status` | ✅ | Budget usage vs. limit for current month |

</details>

<details>
<summary><b>🎯 Goals &nbsp;—&nbsp; <code>/api/v1/goals</code></b></summary>

<br/>

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET`    | `/` | ✅ | Get all savings goals |
| `POST`   | `/` | ✅ | Create a goal |
| `PUT`    | `/:id` | ✅ | Update goal progress |
| `DELETE` | `/:id` | ✅ | Delete a goal |

</details>

---

## 🌍 Environment Variables

**`server/.env`**

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/budgetbuddy
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**`client/.env`**

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🗺️ Roadmap

**Shipped ✅**
- [x] Expense & income tracking with categories
- [x] Monthly budget limits with progress tracking
- [x] Analytics dashboard with charts
- [x] Savings goals tracker
- [x] Dark / light theme
- [x] JWT authentication with refresh tokens
- [x] Mobile responsive UI
- [x] CSV export

**Coming Soon 🔜**
- [ ] 🤖 AI-powered spending insights & anomaly detection
- [ ] 🔔 Push notifications for bill due dates
- [ ] 📲 React Native mobile app
- [ ] 👥 Shared budgets for couples & families
- [ ] 🌍 Multi-currency support with live exchange rates
- [ ] 🏦 Bank account sync via Plaid

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork and clone
git clone https://github.com/yourusername/budget-buddy.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit with conventional commits
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please format your code with Prettier and follow [Conventional Commits](https://www.conventionalcommits.org/) before submitting.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for full details.

---

<div align="center">

<br/>

**Built with 💚 by [Shaurya](https://github.com/yourusername)**

*If Budget Buddy helped you, a ⭐ on GitHub means the world!*

</div>
