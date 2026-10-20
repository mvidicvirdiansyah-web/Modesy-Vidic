
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  category: string;
  image_url: string | null;
  location: string | null;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const { data: product, error } = await supabase
    .from("products")
    .select(
      "id, name, description, price, category, image_url, location"
    )
    .eq("id", Number(id))
    .maybeSingle<Product>();

  if (error) {
    throw new Error("Gagal mengambil detail produk.");
  }

  if (!product) {
    notFound();
  }

  const formattedPrice =
    product.price == null
      ? "Harga belum tersedia"
      : new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(product.price);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-800">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#produk"
          className="mb-6 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          ← Kembali ke daftar produk
        </Link>

        <div className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full max-h-96 w-full object-contain"
              />
            ) : (
              <span className="text-gray-400">
                Foto produk belum tersedia
              </span>
            )}
          </div>

          <div className="flex flex-col items-start">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {product.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-bold text-orange-600">
              {formattedPrice}
            </p>

            <div className="mt-6 w-full border-t border-gray-200 pt-5">
              <h2 className="font-semibold">Deskripsi produk</h2>
              <p className="mt-2 whitespace-pre-line leading-7 text-gray-600">
                {product.description || "Belum ada deskripsi produk."}
              </p>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Lokasi: {product.location || "Belum dicantumkan"}
            </p>

            <a
              href="mailto:"
              className="mt-7 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Hubungi Penjual
            </a>
            <p className="mt-2 text-xs text-gray-400">
              Kontak penjual belum diatur.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
