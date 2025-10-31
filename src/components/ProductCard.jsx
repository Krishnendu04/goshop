import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-36 object-contain"
          />
        </div>
        <h3 className="mt-3 text-sm font-medium line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          {product.category}
        </p>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        <Link
          to={`/product/${product.id}`}
          className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
        >
          View
        </Link>
      </div>
    </article>
  );
}
