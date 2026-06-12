# 📚 Library Management System

A full-stack Library Management System built using **HTML, CSS, JavaScript, Node.js, and Express.js**.
This project allows managing student records and issued books with a clean UI and persistent storage.

## 🚀 Live Demo

Frontend: https://library-management-system-six-sigma.vercel.app
Backend: https://library-management-system-ftho.onrender.com

---

## ✨ Features

* Add new students
* Search students by **Name / Roll Number**
* Show all students
* Delete student records
* Return books
* Sort students in **ascending order (A–Z)**
* Dashboard statistics
* Prevent duplicate student entries
* Append books for existing students
* Maximum **5 books per student**
* User selection when allotment exceeds available slots
* Data persistence using JSON storage
* Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Storage

* JSON File (`students.json`)

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 📂 Project Structure

```plaintext
library_management_system/

├── backend/
│   ├── server.js
│   ├── package.json
│   └── students.json
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ Installation & Run Locally

### Clone Repository

```bash
git clone <your_repo_url>
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Start Backend

```bash
node server.js
```

Backend runs at:

```plaintext
http://localhost:5000
```

### Run Frontend

Open project root and run:

```bash
python -m http.server 5500
```

Frontend:

```plaintext
http://127.0.0.1:5500
```

---

## 📌 Core Functionalities

### Add Student

* Create student record
* Assign books

### Book Allocation Logic

* Existing students receive additional books
* Maximum limit → 5 books
* User chooses books if limit exceeded

### Return Books

* Return one or multiple books

### Search & Sort

* Search using roll number or student name
* Sort alphabetically

### Dashboard

Displays:

* Total Students
* Total Books Issued
* Students at Full Limit

---

## 🔮 Future Improvements

* MongoDB Integration
* Authentication System
* Admin Dashboard
* Export Reports
* Notifications
* Mobile Optimization

---

## 👨‍💻 Author

**Ritik Kumar**

If you found this project useful, feel free to star the repository ⭐
