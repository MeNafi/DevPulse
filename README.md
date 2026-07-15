## 🚼 DevPulse API

#### 𝐃𝐞𝐯𝐏𝐮𝐥𝐬𝐞 𝐀𝐏𝐈 – A modern bug tracking and issue management backend API built with Express.js, TypeScript, and PostgreSQL, hosted on Neon DB. This project follows clean architecture principles and modern backend development practices, featuring secure authentication, role-based access control, scalable project structure, RESTful APIs, database integration, and production-ready code organization.

---


## 🌐 Deployment

![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Live Demo:** https://dev-pulse-puce-kappa.vercel.app/

---


## 🧩 Tech Stack

This backend application is built using modern technologies to ensure scalability, maintainability, and performance.

![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Neon](https://img.shields.io/badge/Hosting-Neon-00E599?style=for-the-badge\&logo=neon\&logoColor=black)

---

## ✨ Features

This project includes essential backend development concepts and real-world API implementation.

| Feature                           | Description                                                  |
| --------------------------------- | ------------------------------------------------------------ |
| 🔐 Authentication & Authorization | Secure user registration, login, and role management         |
| 🛡️ Role-Based Access Control     | Restrict actions based on Maintainer and Contributor roles   |
| 🐞 Issue Management               | Create, retrieve, filter, update, resolve, and delete issues |
| 🔍 Query Filtering                | Filter issues by type, status, and sorting options           |
| 📦 RESTful API                    | Structured API endpoints following REST principles           |
| 🗄️ PostgreSQL Database           | Reliable relational database management                      |
| ☁️ Neon DB                        | Cloud-hosted PostgreSQL database                             |
| ⚡ TypeScript                      | Type-safe, scalable, and maintainable codebase               |
| 🧩 Modular Architecture           | Organized and scalable project structure                     |
| 🚨 Global Error Handling          | Centralized error management system                          |
| 📋 Input Validation               | Secure and validated request handling                        |
| 🚀 Production Ready               | Built using industry-standard best practices                 |

---

## 🚀 Why This Project

This project demonstrates modern backend development practices and serves as a strong foundation for building scalable applications.

| Benefit                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| 🧱 Clean Architecture    | Easy to maintain, extend, and scale         |
| 🔒 RBAC Authorization sensitive resources and operations |
| ⚡ Strict Type Safety     | Reduces bugs through TypeScript             |
| 📦 Modular Structure     | Better separation of concerns               |
| 🗄️ Database Integration | Efficient PostgreSQL data management        |
| ☁️ Cloud Database        | Hosted using Neon PostgreSQL                |
| 🚀 Scalable Design       | Suitable for real-world applications        |

---

## 🔐 Authentication & Security

This API follows modern authentication and security practices.

| Technology               | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| 🔑 JWT Authentication    | Secure authentication using signed access tokens |
| 🛡️ RBAC Middleware      | Dynamic permission enforcement across routes     |
| 🔒 Password Hashing      | Secure storage of user credentials               |
| 🚨 Global Error Handling | Safe, consistent, and structured API responses   |

---

## 📌 API Endpoints

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| POST   | `/api/auth/signup`      | Register a new user            |
| POST   | `/api/auth/login`         | Login and receive access token |
| GET    | `/api/issues`             | Retrieve all issues            |
| GET    | `/api/issues/:id`         | Retrieve a single issue        |
| POST   | `/api/issues`             | Create a new issue             |
| PATCH  | `/api/issues/:id`         | Update an existing issue       |
| DELETE | `/api/issues/:id`         | Delete an issue                |
| GET    | `/api/issues?sort=newest` | Sort issues by creation date   |
| GET    | `/api/issues?status=open` | Filter issues by status        |
| GET    | `/api/issues?type=bug`    | Filter issues by issue type    |

---
```
```
## 📦 Production Dependencies

| Package           | Installation                    |
| ----------------- | ------------------------------- |
| Express.js        | `npm install express`           |
| Dotenv            | `npm install dotenv`            |
| PostgreSQL        | `npm install pg`                |
| JWT               | `npm install jsonwebtoken`      |
| Bcrypt            | `npm install bcrypt`            |
| HTTP Status Codes | `npm install http-status-codes` |

## 🛠️ Development Dependencies

| Package          | Installation                         |
| ---------------- | ------------------------------------ |
| TypeScript       | `npm install -D typescript`          |
| ts-node-dev      | `npm install -D ts-node-dev`         |
| tsup             | `npm install -D tsup`                |
| Express Types    | `npm install -D @types/express`      |
| PostgreSQL Types | `npm install -D @types/pg`           |
| JWT Types        | `npm install -D @types/jsonwebtoken` |
| Bcrypt Types     | `npm install -D @types/bcrypt`       |
| Node.js Types    | `npm install -D @types/node`         |

```
```

## 📁 Project Structure

```bash
DevPulse/
│
├── src/
│   │
│   ├── api/
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── issue.controller.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── issue.routes.ts
│   │   │
│   │   └── services/
│   │       ├── auth.service.ts
│   │       └── issue.service.ts
│   │
│   ├── config/
│   │   └── index.ts
│   │
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── globalErrorHandler.ts
│   │   └── logger.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   ├── index.ts
│   │   └── interface.error.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── sendResponse.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsup.config.ts
├── vercel.json
└── README.md
```

---

## 🛠️ Installation

```bash
# Clone Repository
git clone https://github.com/your-username/DevPulse.git

# Navigate to Project Directory
cd DevPulse

# Install Dependencies
npm install

# Start Development Server
npm run dev
```

---

## 🌱 Environment Variables

Create a `.env` file and configure the following variables:

```env
PORT=5000
DATABASE_URL=your_neon_postgresql_database_url
JWT_SECRET=your_jwt_secret_key
```

---

## 🎯 Goals of This Project

✅ Learn modern backend development and issue tracking systems

✅ Build scalable RESTful APIs with filtering and role-based permissions

✅ Practice enterprise-level TypeScript development

✅ Work with PostgreSQL and Neon DB

✅ Implement secure authentication and authorization

✅ Follow industry-standard backend architecture patterns

---

## 👨‍💻 Author

Developed and maintained by **Nafi**.

⭐ If you find this project useful, consider giving it a star.
