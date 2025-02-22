# 📝 Task Management System

A **drag-and-drop** task management system where users can create, update, delete, and organize tasks into three categories: **To-Do, In Progress, and Done**. Built with **React.js**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 **Live Demo**

🔗 [Live Site](https://task-management-app-by-alifa.web.app)  
🔗 [Backend API](https://task-management-server-eight-delta.vercel.app)

---

## 📌 **Features**

✅ **Drag & Drop**: Move tasks between categories with ease.  
✅ **Create, Edit & Delete**: Users can manage their tasks effortlessly.  
✅ **Optimistic UI Updates**: Changes reflect instantly before database updates.  
✅ **Dark Mode Support**: Fully responsive with light & dark theme.  
✅ **Fully Responsive**: Works across mobile, tablet, and desktop.

---

## 🛠 **Technologies Used**

### **Frontend**

- ⚛️ **React.js** - Component-based UI
- 🎨 **Tailwind CSS** - Modern styling with dark mode support
- 📦 **@hello-pangea/dnd** - Drag-and-drop functionality
- 🔥 **React Toastify** - Notifications

### **Backend**

- 🛠 **Node.js** - Server-side runtime
- 🚀 **Express.js** - API handling
- 🗄 **MongoDB** - NoSQL Database
- 🔐 **CORS & dotenv** - Security & environment management

---

## 📥 **Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/task-management.git
cd task-management
```

### **2️⃣ Install Dependencies**

#### **Frontend**

```sh
cd task-management-client
npm install
```

#### **Backend**

```sh
cd task-management-server
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the **backend (`task-management-server`)** directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### **4️⃣ Start the Application**

#### **Run Backend**

```sh
cd task-management-server
npm run dev
```

#### **Run Frontend**

```sh
cd task-management-client
npm run dev
```

---

## 🔧 **API Endpoints**

### **📌 Tasks API**

| Method   | Endpoint     | Description     |
| -------- | ------------ | --------------- |
| `GET`    | `/tasks`     | Fetch all tasks |
| `POST`   | `/tasks`     | Add a new task  |
| `PUT`    | `/tasks/:id` | Update a task   |
| `DELETE` | `/tasks/:id` | Delete a task   |

---

## 📌 **Contributing**

Contributions are welcome! If you find a bug or want to improve something, feel free to **fork and submit a PR**.

---

## 📜 **License**

This project is licensed under the **MIT License**.

---
