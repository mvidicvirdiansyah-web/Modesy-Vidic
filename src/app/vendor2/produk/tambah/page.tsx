"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TambahProdukPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const numericPrice = Number(price);

    if (!name.trim() || !category || !location.trim()) {
      setError("Nama produk, kategori, dan lokasi wajib diisi.");
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError("Harga harus berupa angka lebih dari 0.");
      return;
    }

    setLoading(true);

    try {
      // Memeriksa akun yang sedang login
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(`Gagal memeriksa akun: ${userError.message}`);
      }

      if (!user) {
        router.push("/auth");
        return;
      }

      // Memeriksa role dan status penjual
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, vendor_status")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error(
          `Gagal memeriksa profil: ${profileError.message}`
        );
      }

      const isAdmin = profile?.role === "admin";
      const isApprovedVendor =
        profile?.role === "vendor" &&
        profile?.vendor_status === "approved";

      if (!isAdmin && !isApprovedVendor) {
        throw new Error(
          `Akun tidak diizinkan menambahkan produk. Role: ${
            profile?.role ?? "tidak ditemukan"
          }, status penjual: ${profile?.vendor_status ?? "tidak ditemukan"}.`
        );
      }

      // Menyimpan produk ke tabel products
      const { data: insertedProduct, error: insertError } = await supabase
        .from("products")
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          price: numericPrice,
          category,
          location: location.trim(),
          image_url: imageUrl.trim() || null,
          user_id: user.id,
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Detail error Supabase:", {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
        });

        throw new Error(
          [
            insertError.message,
            insertError.details,
            insertError.hint,
            insertError.code ? `Kode: ${insertError.code}` : "",
          ]
            .filter(Boolean)
            .join(" | ")
        );
      }

      if (!insertedProduct) {
        throw new Error("Supabase tidak mengembalikan data produk.");
      }

      setSuccess("Produk berhasil ditambahkan!");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLocation("");
      setImageUrl("");

      setTimeout(() => {
        router.push("/vendor2/dashboard");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      console.error("Gagal menambahkan produk:", err);

      if (err && typeof err === "object") {
        const detail = err as Record<string, unknown>;

        const message = [
          detail.message,
          detail.details,
          detail.hint,
          detail.code,
        ]
          .filter(Boolean)
          .map(String)
          .join(" | ");

        setError(
          message
            ? `Produk gagal ditambahkan: ${message}`
            : `Produk gagal ditambahkan. Detail: ${JSON.stringify(err)}`
        );
      } else {
        setError(`Produk gagal ditambahkan: ${String(err)}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/vendor2/dashboard"
          className="text-sm font-medium text-emerald-800 hover:underline"
        >
          ← Kembali ke dashboard
        </Link>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-emerald-800">
            MODESY SELLER CENTER
          </p>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Tambah Produk
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Masukkan informasi barang yang ingin kamu jual.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 whitespace-pre-wrap break-words rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama produk *
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Sepatu Sneakers"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan kondisi dan detail produk"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Harga (Rp) *
              </label>
              <input
                id="price"
                type="number"
                min="1"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 250000"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Kategori *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
              >
                <option value="">Pilih kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Fashion">Fashion</option>
                <option value="Rumah Tangga">Rumah Tangga</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Lokasi *
              </label>
              <input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Bangil, Pasuruan"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                URL gambar produk
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://contoh.com/gambar.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700"
              />
              <p className="mt-1 text-xs text-gray-500">
                Opsional. Masukkan URL gambar yang bisa diakses publik.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}