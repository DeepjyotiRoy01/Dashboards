<div align="center">

# 🚀 Interactive Dashboard Application

*A modern, feature-rich dashboard with AI-powered insights and beautiful data visualizations*

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)



</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 **Authentication & Security**
- 🛡️ Secure JWT-based authentication
- 👤 User registration and login
- 🔒 Protected routes and middleware
- 👥 User profile management

### 📊 **Multiple Dashboard Types**
- 📈 **Analytics Dashboard** - Business metrics and KPIs
- 💰 **Sales Dashboard** - Revenue tracking and sales performance
- 📢 **Marketing Dashboard** - Campaign analytics and ROI
- 💼 **Finance Dashboard** - Financial reports and budgeting
- ⚙️ **Operations Dashboard** - System monitoring and efficiency

### 🎨 **UI/UX Excellence**
- 📱 Fully responsive design
- 🌓 Dark/Light theme toggle
- 🎭 Beautiful Material-UI components
- ✨ Smooth animations with Framer Motion

</td>
<td width="50%">

### 🤖 **AI-Powered Chatbot**
- 💬 Predefined Q&A for dashboard insights
- 🎯 Context-aware responses
- 📊 Dashboard-specific guidance
- 🔍 Quick help and navigation

### 🎛️ **Advanced Dashboard Features**
- ➕ Create custom dashboards with templates
- 🔧 Drag-and-drop widget management
- 📊 Interactive charts and data visualization
- 💾 Save and manage multiple dashboards
- ⭐ Favorites and recent dashboards

### 🚀 **Enhanced Navigation**
- 🎯 Quick dashboard access dropdown
- 🔍 Global search functionality
- 🔔 Notification system
- 👤 Rich user profile display

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)


</div>

---

## 🚀 Quick Start

### 📋 Prerequisites

- 📦 **Node.js** (v18 or higher)
- 🍃 **MongoDB** (local installation or Atlas cloud)
- 🐙 **Git** (for cloning the repository)

### ⚡ Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/DeepjyotiRoy01/Dashboards.git
cd Dashboards

# 2️⃣ Install server dependencies
cd server
npm install

# 3️⃣ Install client dependencies
cd ../client
npm install
```

### 🔧 Environment Setup

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/dashboard

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# AI Integration
OPENAI_API_KEY=your_openai_api_key_here
```

### 🏃‍♂️ Running the Application

```bash
# 🖥️ Start the server (from server directory)
cd server
npm run dev

# 🌐 Start the client (from client directory)
cd ../client
npm run dev
```

🎉 **Access your dashboard at:** `http://localhost:5173`

---

## 📊 Dashboard Types

<div align="center">

| Dashboard | Description | Key Features |
|-----------|-------------|-------------|
| 📈 **Analytics** | Business intelligence and KPIs | Revenue trends, user analytics, performance metrics |
| 💰 **Sales** | Sales performance tracking | Deal pipeline, sales reps performance, revenue forecasting |
| 📢 **Marketing** | Campaign and marketing analytics | Campaign ROI, lead generation, conversion rates |
| 💼 **Finance** | Financial reporting and budgeting | Expense tracking, budget analysis, financial health |
| ⚙️ **Operations** | System monitoring and efficiency | System status, operational metrics, performance monitoring |

</div>

---

## 📁 Project Structure

```
📦 Interactive Dashboard
├── 📂 client/                 # 🎨 Frontend React Application
│   ├── 📂 public/             # 🌐 Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/     # 🧩 Reusable UI components
│   │   │   ├── 📂 widgets/    # 📊 Dashboard widgets
│   │   │   │   ├── ChartWidget.jsx    # 📈 Chart components
│   │   │   │   ├── TableWidget.jsx    # 📋 Table components
│   │   │   │   ├── MetricWidget.jsx   # 📊 Metric displays
│   │   │   │   ├── MapWidget.jsx      # 🗺️ Map visualizations
│   │   │   │   ├── Widget.jsx         # 🎛️ Base widget component
│   │   │   │   └── WidgetForm.jsx     # ⚙️ Widget configuration
│   │   │   ├── Header.jsx     # 🔝 Enhanced navigation header
│   │   │   ├── Sidebar.jsx    # 📋 Navigation sidebar
│   │   │   └── Chatbot.jsx    # 🤖 AI chatbot component
│   │   ├── 📂 context/        # 🔄 React Context providers
│   │   │   ├── AuthContext.jsx        # 🔐 Authentication state
│   │   │   ├── DashboardContext.jsx   # 📊 Dashboard state
│   │   │   ├── ChatbotContext.jsx     # 🤖 Chatbot state
│   │   │   ├── ThemeContext.jsx       # 🎨 Theme management
│   │   │   └── ThemeModeContext.jsx   # 🌓 Dark/Light mode
│   │   ├── 📂 layouts/        # 🏗️ Page layouts
│   │   │   ├── AuthLayout.jsx         # 🔐 Authentication layout
│   │   │   └── MainLayout.jsx         # 🏠 Main app layout
│   │   ├── 📂 pages/          # 📄 Application pages
│   │   │   ├── 📂 auth/       # 🔐 Authentication pages
│   │   │   │   ├── Login.jsx          # 🔑 Login page
│   │   │   │   └── Register.jsx       # 📝 Registration page
│   │   │   ├── AnalyticsDashboard.jsx # 📈 Analytics dashboard
│   │   │   ├── SalesDashboard.jsx     # 💰 Sales dashboard
│   │   │   ├── MarketingDashboard.jsx # 📢 Marketing dashboard
│   │   │   ├── FinanceDashboard.jsx   # 💼 Finance dashboard
│   │   │   ├── OperationsDashboard.jsx # ⚙️ Operations dashboard
│   │   │   ├── Dashboard.jsx          # 📊 Main dashboard
│   │   │   ├── CreateDashboard.jsx    # ➕ Dashboard creation
│   │   │   ├── FavoritesDashboard.jsx # ⭐ Favorites page
│   │   │   ├── RecentDashboard.jsx    # 🕒 Recent dashboards
│   │   │   ├── ChatbotPage.jsx        # 🤖 Chatbot interface
│   │   │   ├── Profile.jsx            # 👤 User profile
│   │   │   ├── Settings.jsx           # ⚙️ App settings
│   │   │   ├── Themes.jsx             # 🎨 Theme selection
│   │   │   ├── HelpSupport.jsx        # ❓ Help & support
│   │   │   └── Landing.jsx            # 🏠 Landing page
│   │   └── 📂 utils/          # 🛠️ Utility functions
│   │       └── api.js                 # 🌐 API service layer
│   ├── 📄 index.html          # 🌐 HTML template
│   ├── 📄 vite.config.js      # ⚙️ Vite configuration
│   └── 📄 package.json        # 📦 Dependencies
├── 📂 server/                 # 🖥️ Backend Node.js Application
│   ├── 📂 controllers/        # 🎮 Business logic
│   │   ├── authController.js          # 🔐 Authentication logic
│   │   ├── dashboardController.js     # 📊 Dashboard operations
│   │   └── chatbotController.js       # 🤖 AI chatbot logic
│   ├── 📂 middleware/         # 🛡️ Custom middleware
│   │   ├── auth.js                    # 🔐 Auth middleware
│   │   └── errorHandler.js            # ❌ Error handling
│   ├── 📂 models/             # 🗄️ Database models
│   │   ├── User.js                    # 👤 User model
│   │   ├── Dashboard.js               # 📊 Dashboard model
│   │   └── Chatbot.js                 # 🤖 Chatbot model
│   ├── 📂 routes/             # 🛣️ API endpoints
│   │   ├── authRoutes.js              # 🔐 Auth routes
│   │   ├── dashboardRoutes.js         # 📊 Dashboard routes
│   │   └── chatbotRoutes.js           # 🤖 Chatbot routes
│   ├── 📂 utils/              # 🔧 Helper functions
│   │   ├── ai.js                      # 🤖 AI utilities
│   │   ├── db.js                      # 🗄️ Database connection
│   │   ├── response.js                # 📤 Response helpers
│   │   └── validator.js               # ✅ Input validation
│   ├── 📄 index.js            # 🚀 Server entry point
│   └── 📄 package.json        # 📦 Dependencies
├── 📄 .gitignore              # 🚫 Git ignore rules
├── 📄 CHATBOT_SETUP.md        # 🤖 Chatbot documentation
└── 📄 README.md               # 📖 Project documentation
```

---

## 🎯 API Endpoints

<details>
<summary><b>🔐 Authentication Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | 👤 Register new user |
| `POST` | `/api/auth/login` | 🔑 User login |
| `GET` | `/api/auth/me` | 👤 Get current user |

</details>

<details>
<summary><b>📊 Dashboard Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboards` | 📋 Get all dashboards |
| `POST` | `/api/dashboards` | ➕ Create new dashboard |
| `PUT` | `/api/dashboards/:id` | ✏️ Update dashboard |
| `DELETE` | `/api/dashboards/:id` | 🗑️ Delete dashboard |

</details>

<details>
<summary><b>🤖 Chatbot Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chatbot/chat` | 💬 Send message to AI |
| `GET` | `/api/chatbot/conversations` | 📜 Get chat history |

</details>

---


---

## 🔧 Troubleshooting

<details>
<summary><b>🚨 Common Issues & Solutions</b></summary>

### ❌ **MongoDB Connection Error**
```bash
# Make sure MongoDB is running
# For local MongoDB:
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Or use MongoDB Atlas cloud connection
```

### ❌ **Port Already in Use**
```bash
# Kill process using port 5000 or 5173
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

### ❌ **Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

</details>

---

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎨 **Material-UI (MUI)** for the beautiful component library
- 📊 **Chart.js** for amazing data visualization
- ✨ **Framer Motion** for smooth animations
- ⚡ **Vite** for lightning-fast development
- 🚀 **React** for the incredible frontend framework
- 🖥️ **Express.js** for robust backend API
- 🍃 **MongoDB** for flexible data storage
- 🔐 **JWT** for secure authentication

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ by [Deepjyoti Roy](https://github.com/DeepjyotiRoy01)**

[![GitHub stars](https://img.shields.io/github/stars/DeepjyotiRoy01/Dashboards.svg?style=social&label=Star)](https://github.com/DeepjyotiRoy01/Dashboards.git)
[![GitHub forks](https://img.shields.io/github/forks/DeepjyotiRoy01/Dashboards.svg?style=social&label=Fork)](https://github.com/DeepjyotiRoy01/Dashboards/fork)

</div>
