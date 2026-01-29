# E-ComAd - Advanced Enterprise Dashboard & Social Platform
Visit : ecommerce-delta-ashy-66.vercel.app
Nexus is a comprehensive, feature-rich web application combining enterprise dashboard capabilities with a fully functional social media platform. Built with modern web technologies, it offers a seamless experience for project management, e-commerce analytics, file management, and real-time communication.

![Nexus Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80) 
*(Note: Replace with actual screenshot)*

## 🚀 Key Features

### 🌟 Core Dashboard
- **Comprehensive Widgets**: Real-time stats, charts (ApexCharts/Recharts), and analytics.
- **Customizable Layouts**: Flexible grid systems for personalized views.
- **Dark/Light Mode**: Full theming support.

### 👥 Social Platform
- **Interactive Feed**: Post updates with rich text, images, and emojis.
- **Engagement**: Like, comment, and share functionality.
- **Global Language Support**: Fully localized in **English (EN)**, **Tamil (TA)**, and **Hindi (HI)**.
- **Profile Management**: customizable profiles with avatars and bios.

### 🔐 Authentication & Security
- **Secure Auth**: JWT-based authentication with Access/Refresh tokens.
- **Role-Based Access**: Granular permissions for Admins and Users.
- **OTP Verification**: Secure password reset flow via Email.
- **Rate Limiting**: Protection against brute-force attacks.

### 💼 Enterprise Tools
- **Project Management**: Kanban-style project tracking and task assignment.
- **E-commerce**: Product management, cart, wishlist, and order processing.
- **File Manager**: Intuitive file organization and management.
- **Chat Application**: Real-time messaging with user status.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite) - Fast, modern UI library.
- **Tailwind CSS** - Utility-first styling.
- **Framer Motion** - Smooth, complex animations.
- **Redux / Context API** - State management.
- **i18next** - Internationalization.
- **Lucide React** - Beautiful, consistent icons.

### Backend
- **Node.js & Express** - Scalable server architecture.
- **Prisma ORM** - Type-safe database access (SQLite/MongoDB).
- **Socket.io** - Real-time bi-directional communication.
- **Redis** - Caching and rate limiting using `express-rate-limit`.
- **JWT** - Secure stateless authentication.

---

## ⚙️ prerequisites

- **Node.js** (v18 or higher)
- **NPM** or **Yarn**
- **Git**

---

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/Thirumalaivasudhevan/E-commerce.git
cd E-commerce
```

### 1. Backend Setup

Navigate to the server directory:
```bash
cd App/server
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Create a `.env` file in `App/server/` and add:
```env
PORT=5000
DATABASE_URL="file:./dev.db" # Or your MongoDB connection string
JWT_SECRET="your_super_secret_jwt_key"
JWT_REFRESH_SECRET="your_super_secret_refresh_key"
API_KEY="your_secure_api_key_hash"
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_password"
CLIENT_URL="http://localhost:5173"
```

Initialize Database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Start the Server:
```bash
npm run dev
```

### 2. Frontend Setup

Navigate to the client directory (open a new terminal):
```bash
cd App/client
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Create a `.env` file in `App/client/` and add:
```env
VITE_API_URL="http://localhost:5000/api"
VITE_API_KEY="your_secure_api_key_hash" # Must match backend
```

Start the Client:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
