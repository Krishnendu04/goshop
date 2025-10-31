import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
      >
        GoShop
      </Link>

      {/* Navbar buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="text-sm text-gray-700 dark:text-gray-200 border border-gray-400 px-2 py-1 rounded"
        >
          🌓 Toggle
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative flex items-center gap-1"
        >
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="absolute right-4 top-16 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-h-[70vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Your Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate max-w-[120px]">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.qty} × ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Total</span>
                  <span className="font-semibold">${totalPrice}</span>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
