import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const { data: product, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  if (loading) return <div className="skeleton h-48 w-full"></div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-96 object-contain"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="mt-2 text-gray-500">{product.category}</div>
        <div className="mt-4 text-3xl font-semibold">
          ${product.price.toFixed(2)}
        </div>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {product.description}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => {
              addToCart(product);
              alert("Product Added");
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add to Cart
          </button>
          <Link to="/" className="px-4 py-2 border rounded">
            Back
          </Link>
          <div className="text-sm">
            Rating: {product.rating?.rate ?? "—"} ({product.rating?.count ?? 0})
          </div>
        </div>
      </div>
    </div>
  );
}
