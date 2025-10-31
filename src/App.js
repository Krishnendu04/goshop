import "./index.css";

import { Routes, Route } from "react-router-dom";

export default function App() {
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/"/>
          <Route path="/product/:id"/>
        </Routes>
      </main>
    </div>
  );
}
