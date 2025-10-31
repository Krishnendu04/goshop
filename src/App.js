import "./index.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("dark");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header dark={dark} setDark={setDark} />
      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}
