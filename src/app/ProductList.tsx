
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductSearch from "./ProductSearch";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  location: string | null;
};

const categories = [
  "Semua",
  "Elektronik",
  "Furnitur",
  "Fashion",
  "Kendaraan",
  "Aksesori",
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");

      let query = supabase
        .from("products")
        .select(
          "id, name, description, price, category, image_url, location"
        )
        .order("created_at", { ascending: false });

      if (keyword.trim()) {
        query = query.ilike("name", `%${keyword.trim()}%`);
      }

      if (selectedCategory !== "Semua") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setProducts([]);
      } else {
        setProducts((data ?? []) as Product[]);
      }

      setLoading(false);
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [keyword, selectedCategory]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <section id="produk" className="w-full px-[22px] pb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Featured Products
        </h2>
      </div>

      <ProductSearch onSearch={setKeyword} />

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              selectedCategory === category
                ? "border-teal-600 bg-teal-600 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-teal-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mb-4 mt-4 text-xs text-gray-500">
        {keyword ? `Pencarian: "${keyword}" · ` : ""}
        Kategori: {selectedCategory}
      </p>

      {loading ? (
        <p className="py-8 text-sm text-gray-500">Memuat produk...</p>
      ) : error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Gagal memuat produk: {error}
        </p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.slice(0, 12).map((product, index) => {
            const isFavorite = favorites.includes(product.id);
            const image =
              product.image_url || fallbackImages[index % fallbackImages.length];

            return (
              <article
                key={product.id}
                className="group relative min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                <Link
                  href={`/produk/${product.id}`}
                  aria-label={`Lihat detail ${product.name}`}
                  className="relative block overflow-hidden bg-gray-100"
                >
                  <div className="aspect-[3/3.1] overflow-hidden">
                    <img
                      src={image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <Link
                    href={`/produk/${product.id}`}
                    aria-label={`Lihat detail ${product.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-gray-700 shadow-md transition hover:text-teal-600"
                  >
                    🛒
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={
                      isFavorite ? "Hapus favorit" : "Tambah favorit"
                    }
                    aria-pressed={isFavorite}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md ${
                      isFavorite ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                </div>

                <div className="min-h-[150px] p-3">
                  <Link
                    href={`/produk/${product.id}`}
                    className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900 transition hover:text-teal-600"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    {product.location || "Admin"}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-1">
                    <span className="text-xl leading-none tracking-tight text-gray-300">
                      ☆☆☆☆☆
                    </span>
                    <span className="text-xs text-gray-500">
                      ♡ 0
                    </span>
                  </div>

                  <p className="mt-4 break-words text-base font-bold text-green-600">
                    {formatPrice(Number(product.price))}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="font-semibold text-gray-800">
            Produk tidak ditemukan
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Coba kata pencarian atau kategori lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setKeyword("");
              setSelectedCategory("Semua");
            }}
            className="mt-4 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Reset filter
          </button>
        </div>
      )}
    </section>
  );
}
