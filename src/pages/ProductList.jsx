import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const API = "https://fakestoreapi.com/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const PER_PAGE = 12;
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setProducts(data);
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);
  // client-side search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;
    if (q)
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );

    if (sort === "price-asc")
      list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = list.slice().sort((a, b) => b.price - a.price);
    if (sort === "alpha")
      list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, query, sort]);

  const total = filtered.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [query, sort]);

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or category"
            className="px-3 py-2 border rounded w-72 bg-white dark:bg-gray-800"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded bg-white dark:bg-gray-800"
          >
            <option value="">Sort</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          Found {total} products
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-white dark:bg-gray-800 border rounded skeleton h-56"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded"
              disabled={page === 1}
            >
              Prev
            </button>
            <div>
              Page {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
