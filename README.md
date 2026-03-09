<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Budget%20Buddy&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Your%20Smart%20Personal%20Finance%20Companion&descAlignY=60&descSize=18" width="100%"/>

<br/>

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

> **Budget Buddy** is a beautiful, full-stack personal finance tracker that helps you log expenses, set budgets, track savings goals, and understand your spending — all in one place.

<br/>

[🚀 Live Demo](#) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues) · [📖 Docs](#)

<br/>

---

</div>

<br/>

## 📸 Screenshots

<div align="center">

| Dashboard | Expense Tracker | Budget Overview |
|:---------:|:---------------:|:---------------:|
| ![Dashboard](https://via.placeholder.com/280x180/1a56db/ffffff?text=Dashboard) | ![Expenses](https://via.placeholder.com/280x180/059669/ffffff?text=Expenses) | ![Budget](https://via.placeholder.com/280x180/d97706/ffffff?text=Budget) |

</div>

<br/>

---

## ✨ Features

<div align="center">

| 💰 | 📊 | 🎯 | 🔔 |
|:---:|:---:|:---:|:---:|
| **Smart Expense Logging** | **Visual Analytics** | **Savings Goals** | **Bill Reminders** |
| Log income & expenses with categories, tags, and notes in seconds | Beautiful charts showing spending patterns, trends, and category breakdowns | Set savings targets and track progress with milestone celebrations | Never miss a payment with smart recurring bill tracking |

</div>

<br/>

### 🔥 Full Feature List

- **💸 Expense & Income Tracking** — Log transactions with categories, tags, and notes
- **📅 Monthly Budgets** — Set spending limits per category with real-time progress bars
- **📈 Analytics Dashboard** — Line charts, pie charts, and spending heatmaps
- **🎯 Savings Goals** — Visual goal cards with progress tracking
- **🔁 Recurring Transactions** — Auto-log subscriptions, rent, salary
- **📤 Export Data** — Download your data as CSV or PDF
- **🌙 Dark / Light Mode** — Easy on the eyes, any time of day
- **📱 Fully Responsive** — Works great on mobile, tablet, and desktop
- **🔒 Secure Auth** — JWT-based authentication with encrypted passwords
- **🗂️ Transaction History** — Full searchable, filterable transaction log

<br/>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### DevOps & Tools
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

</div>

<br/>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node >= 18.0.0
npm >= 9.0.0
MongoDB Atlas account (free)
```

### ⚡ Quick Setup

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/budget-buddy.git
cd budget-buddy
```

**2. Install dependencies**

```bash
# Install backend deps
cd server && npm install

# Install frontend deps
cd ../client && npm install
```

**3. Set up environment variables**

```bash
# In /server, create a .env file:
cp .env.example .env
```

```env
# Server .env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

```env
# Client .env
VITE_API_URL=http://localhost:5000/api/v1
```

**4. Run the app**

```bash
# Run backend (from /server)
npm run dev

# Run frontend (from /client)
npm run dev
```

**5. Open in browser**

```
http://localhost:5173
```

> 🎉 You're all set! Create an account and start tracking your finances.

<br/>

---

## 📁 Project Structure

```
budget-buddy/
├── 📂 client/                  # React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/      # Reusable UI components
│   │   ├── 📂 pages/           # Route-level pages
│   │   ├── 📂 hooks/           # Custom React hooks
│   │   ├── 📂 context/         # Auth & theme context
│   │   ├── 📂 utils/           # Helper functions
│   │   └── 📂 assets/          # Images, icons
│   └── 📄 vite.config.js
│
├── 📂 server/                  # Node.js Backend
│   ├── 📂 controllers/         # Route handlers
│   ├── 📂 models/              # MongoDB schemas
│   ├── 📂 routes/              # API endpoints
│   ├── 📂 middleware/          # Auth, error handling
│   └── 📄 server.js
│
└── 📄 README.md
```

<br/>

---

## 🔌 API Reference

<details>
<summary><b>🔐 Authentication</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Create a new account |
| `POST` | `/api/v1/auth/login` | Login and get JWT token |
| `POST` | `/api/v1/auth/logout` | Invalidate session |
| `GET`  | `/api/v1/auth/me` | Get current user |

</details>

<details>
<summary><b>💸 Transactions</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/api/v1/transactions` | Get all transactions |
| `POST`   | `/api/v1/transactions` | Create a transaction |
| `PUT`    | `/api/v1/transactions/:id` | Update a transaction |
| `DELETE` | `/api/v1/transactions/:id` | Delete a transaction |
| `GET`    | `/api/v1/transactions/summary` | Monthly summary |

</details>

<details>
<summary><b>🎯 Budgets & Goals</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/v1/budgets` | Get all budgets |
| `POST` | `/api/v1/budgets` | Create a budget |
| `GET`  | `/api/v1/goals` | Get savings goals |
| `POST` | `/api/v1/goals` | Create a savings goal |

</details>

<br/>

---

## 🗺️ Roadmap

- [x] 💸 Expense & income tracking
- [x] 📊 Dashboard with charts
- [x] 🌙 Dark / light mode
- [x] 🔒 Authentication
- [x] 📱 Mobile responsive
- [ ] 🤖 AI-powered spending insights
- [ ] 📲 Mobile app (React Native)
- [ ] 🏦 Bank account sync
- [ ] 👥 Shared budgets for couples/families
- [ ] 🌍 Multi-currency support

<br/>

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch — `git checkout -b feature/AmazingFeature`
3. Commit your changes — `git commit -m 'Add some AmazingFeature'`
4. Push to the branch — `git push origin feature/AmazingFeature`
5. Open a Pull Request

<br/>

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<br/>

---

<div align="center">

### 🌟 If Budget Buddy helped you, give it a star!

[![Star History Chart](https://img.shields.io/github/stars/yourusername/budget-buddy?style=social)](https://github.com/yourusername/budget-buddy)

<br/>

**Made with ❤️ by [Shaurya](https://github.com/yourusername)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>
