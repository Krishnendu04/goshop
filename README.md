# 🛍️ Fake Store React App

A simple, clean React application that fetches products from the [Fake Store API](https://fakestoreapi.com/) and displays them in a responsive grid with search, sort, category filter, and cart functionality.

This project is built to demonstrate a complete front-end workflow — from fetching data and building reusable components to managing global state with React Context and implementing responsive UI with Tailwind CSS.

---

## 🚀 Features

- **Product Listing:** Fetches product data from Fake Store API and displays in a responsive grid.
- **Search & Sorting:** Search by title or category; sort by price or name.
- **Category Filter:** Quickly filter products by category.
- **Pagination:** Client-side pagination (12 items per page) for smoother navigation.
- **Product Details:** Dedicated detail page for each product.
- **Cart Management:** Add/remove items and persist cart state in `localStorage`.
- **Dark/Light Mode:** User-controlled theme toggle with persistent preference.
- **Responsive UI:** Works across desktop, tablet, and mobile.
- **Skeleton Loading:** Improves perceived performance while fetching data.

---

## 🧠 Project Architecture & Design Decisions

### 1. **Tech Stack**

- **React :** Chosen for its component-based architecture, reusability, and strong community support. It provides a clean way to build interactive UIs with minimal setup..
- **Tailwind CSS:** For rapid and consistent styling using utility classes.
- **React Router:** To handle navigation between pages (home, product details).
- **Context API:** Simple global state management for cart without external libraries.
- **LocalStorage:** Lightweight persistence for cart items and theme preference.

### 2. **Directory Structure**

src/
│
├── components/
│ ├── Header.jsx # Top navigation bar and cart drawer
│ ├── ProductCard.jsx # Reusable card for products
│
├── context/
│ └── CartContext.jsx # Global cart state + localStorage sync
│
├── pages/
│ ├── ProductList.jsx # Main product grid page with filters
│ ├── ProductDetails.jsx# Individual product page
│
├── App.js # Routing setup
├── index.js # Entry point
└── index.css # Tailwind CSS base styles

### 3. **Data Flow**

- Products are fetched once (on mount in `ProductList.jsx`) from Fake Store API.
- Search, sort, category, and pagination are applied on the client using memoized selectors (`useMemo`) to optimize performance.
- Cart operations are managed in a React Context (`CartContext`) so any component can read/update the cart.
- Cart data and theme preference persist using browser `localStorage`.

### 4. **UI Philosophy**

- Focused on clean, readable UI with minimal visual clutter.
- Kept dependencies small — no heavy UI frameworks.
- Followed accessible color contrast and keyboard navigability.

---

## ⚙️ How to Run the Project

### Prerequisites

Make sure you have **Node.js (≥ 18)** and **npm** or **yarn** installed.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Krishnendu04/goshop.git
cd goshop

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm start
Open your browser and visit http://localhost:3000

4️⃣ Build for production
npm run build

5️⃣ Preview the production build
npm run preview
```
