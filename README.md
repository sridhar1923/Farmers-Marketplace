# 🌾 Farmer’s Marketplace — Full Stack DBMS Project

A modern **Farmer–Customer Marketplace** built using **React.js**, **Node.js**, **Express**, and **MySQL**.  
This project demonstrates a real-world **Database Management System (DBMS)** with authentication, relational tables, and a transaction-based cart system.

---

##  Features

###  Farmers
- Register & login securely
- Add, update, and delete products
- View own listed items & sales summary

### Customers
- Browse all products
- Add items to cart & checkout
- View past orders and totals

### System
- JWT authentication
- Role-based access (Farmer/Customer)
- Relational MySQL DB with Sequelize ORM
- Responsive dark-glow UI (React + TailwindCSS)

---

## Database Overview

**Tables:**
- `users` → (id, name, email, password, role)
- `products` → (id, name, price, stock, farmerId)
- `cart` → (id, userId, productId, quantity)
- `orders` → (id, userId, productId, quantity, totalPrice)

**Relations:**
- 1 Farmer → Many Products  
- 1 Customer → Many Orders  
- Cart & Orders link Users ↔ Products

---

**Highlights:**
- Secure JWT login
- CRUD operations on products
- Cart + checkout workflow
- Aggregation queries for sales
- Fully responsive UI with dark neon design

**TechStack:**
- Frontend: React, TailwindCSS
- Backend: Node.js, Express
- Database: MySQL (Sequelize ORM)
- Auth: JWT + bcrypt

# To install all dependencies listed in requirements.txt
xargs -a requirements.txt -L 1 npm install
