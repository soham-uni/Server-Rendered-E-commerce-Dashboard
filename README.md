# 🛒 SSR E-Commerce Product Management Dashboard

A full-stack **Server-Side Rendered (SSR)** admin dashboard for managing an e-commerce platform. This application provides secure authentication, product management, analytics, and a modern responsive UI, built with production-grade architecture.

---

## 🌐 Live Project & Submission Links

* **🔗 Live Deployment:** https://e-commerce-dashboard-ruby.vercel.app
* **🎥 Demo Video:** ( )

### 🔐 Demo Admin Credentials
*Use these credentials to access the dashboard during review:*
> **Email:** `admin@example.com`  
> **Password:** `admin1234`

---

## 📌 Project Overview

This project is a high-performance Admin Dashboard designed for e-commerce operators. It enables administrators to handle the heavy lifting of backend management through a streamlined interface:

* **Manage Products:** Full CRUD (Create, Read, Update, Delete) functionality for inventory.
* **Media Management:** Professional image handling and optimization via **Cloudinary**.
* **Analytics:** Visual tracking of revenue and category-specific sales data.
* **Secure Access:** Server-side authentication and route protection.
* **SSR Performance:** Utilizing **Next.js App Router** for optimized data fetching.



---

## ✨ Key Features

* **🔒 Secure Admin Auth:** Robust login system with session persistence.
* **⚡ Next.js 14 SSR:** Leveraging Server-Side Rendering for maximum performance.
* **📦 Inventory Hub:** Centralized management for the entire product lifecycle.
* **🖼️ Cloud Storage:** Cloud-based image upload and management via Cloudinary.
* **📊 Interactive Analytics:** Sales and category insights using **Recharts**.
* **🔍 Global Search:** Real-time filtering across the entire product list.
* **🚀 Production-Ready:** Fully deployed on **Vercel** with automated CI/CD.

---

## 🧱 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes (Node.js) |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | Custom Auth / NextAuth |
| **Validation** | Zod |
| **Media Storage** | Cloudinary |
| **Charts** | Recharts |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```text
ECOMMERCE-ADMIN-DASHBOARD/
├── app/
│   ├── api/                
│   │   ├── admin/          
│   │   ├── analytics/      
│   │   ├── auth/           
│   │   ├── products/       
│   │   └── upload/         
│   ├── dashboard/          
│   │   ├── admins/         
│   │   ├── products/       
│   │   │   ├── [id]/       
│   │   │   └── new/        
│   │   ├── DashboardCharts.tsx 
│   │   ├── layout.tsx      
│   │   └── page.tsx        
│   ├── login/               
│   ├── globals.css         
│   ├── layout.tsx          
│   └── page.tsx            
├── components/             
├── lib/                    
│   ├── auth/               
│   ├── cloudinary/         
│   ├── constants/          
│   ├── db/                 
│   ├── utils/              
│   └── validators/         
├── models/                 
│   ├── Admin.ts            
│   └── Product.ts          
├── public/                 
└── .env.local              
```
## ⚙️ Steps to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/soham-uni/Server-Rendered-E-commerce-Dashboard/
cd ecommerce-admin-dashboard
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Configure Environment Variables
> Create a file named .env.local in the root directory and add:
```bash
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
### 4️⃣ Run the Development Server
```bash
npm run dev
```
### Open in your browser:
```bash
http://localhost:3000
```

---

## 🧪 Architecture & Performance
- App Router: Optimized for performance using the latest Next.js paradigms.

- Server Components: Heavy logic remains on the server, significantly reducing the client-side bundle size.

- Safe State: Client components are used selectively only where interactivity (like charts or forms) is required.

- Data Integrity: Strict schema validation using Zod to prevent database corruption.
---
## 🧑‍💻 Author
Soham Adak
