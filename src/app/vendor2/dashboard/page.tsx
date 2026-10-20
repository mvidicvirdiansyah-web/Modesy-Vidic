
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  location: string | null;
  image_url: string | null;
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  location: "",
  image_url: "",
};

type ProductForm = typeof emptyForm;

export default function VendorDashboardPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData.user;

      if (!user) {
        router.replace("/auth");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, vendor_status")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        throw new Error("Profil akun tidak ditemukan.");
      }

      const isAdmin = profile.role === "admin";
      const isApprovedVendor =
        profile.role === "vendor" &&
        profile.vendor_status === "approved";

      if (!isAdmin && !isApprovedVendor) {
        throw new Error("Akun tidak memiliki akses dashboard penjual.");
      }

      const { data, error: productsError } = await supabase
        .from("products")
        .select(
          "id, name, description, price, category, location, image_url"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;

      setProducts((data ?? []) as Product[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat produk."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      category: product.category ?? "",
      location: product.location ?? "",
      image_url: product.image_url ?? "",
    });
    setError("");
    setMessage("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  }

  function updateField(
    field: keyof ProductForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    const name = form.name.trim();
    const price = Number(form.price);

    if (!name || !form.category.trim() || !form.location.trim()) {
      setError("Nama, kategori, dan lokasi wajib diisi.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError("Harga harus berupa angka lebih dari 0.");
      return;
    }

    if (form.image_url.trim()) {
      try {
        const url = new URL(form.image_url.trim());
        if (url.protocol !== "https:" && url.protocol !== "http:") {
          throw new Error();
        }
      } catch {
        setError("URL gambar tidak valid.");
        return;
      }
    }

    setSaving(true);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;
      if (!userData.user) throw new Error("Silakan login kembali.");

      const userId = userData.user.id;

      const productData = {
        name,
        description: form.description.trim() || null,
        price,
        category: form.category.trim(),
        location: form.location.trim(),
        image_url: form.image_url.trim() || null,
      };

      if (editingId !== null) {
        // Update hanya produk milik akun yang sedang login.
        const { data, error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId)
          .eq("user_id", userId)
          .select("id");

        if (updateError) throw updateError;

        if (!data || data.length === 0) {
          throw new Error(
            "Produk tidak ditemukan atau kamu tidak memiliki izin mengeditnya."
          );
        }

        setMessage("Produk berhasil diperbarui.");
      } else {
        // Produk baru dimiliki akun yang sedang login.
        const { error: insertError } = await supabase
          .from("products")
          .insert({
            ...productData,
            user_id: userId,
          });

        if (insertError) throw insertError;

        setMessage("Produk berhasil ditambahkan.");
      }

      setEditingId(null);
      setForm(emptyForm);
      await loadProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan produk."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Yakin ingin menghapus produk "${product.name}"? Tindakan ini tidak dapat dibatalkan.`
    );

    if (!confirmed) return;

    setDeletingId(product.id);
    setError("");
    setMessage("");

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;
      if (!userData.user) throw new Error("Silakan login kembali.");

      const { data, error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id)
        .eq("user_id", userData.user.id)
        .select("id");

      if (deleteError) throw deleteError;

      if (!data || data.length === 0) {
        throw new Error(
          "Produk tidak ditemukan atau kamu tidak memiliki izin menghapusnya."
        );
      }

      if (editingId === product.id) {
        cancelEdit();
      }

      setProducts((current) =>
        current.filter((item) => item.id !== product.id)
      );

      setMessage("Produk berhasil dihapus.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menghapus produk."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-800">
              MODESY SELLER CENTER
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Dashboard Produk
            </h1>
            <p className="mt-2 text-gray-600">
              Tambahkan, edit, dan hapus produk jualanmu.
            </p>
          </div>

          <Link
            href="/vendor2/produk/tambah"
            className="rounded-lg bg-emerald-800 px-5 py-3 text-center font-semibold text-white hover:bg-emerald-900"
          >
            + Tambah Produk
          </Link>
        </header>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            {message}
          </div>
        )}

        {editingId !== null && (
          <section className="mt-8 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Edit Produk
            </h2>

            <form onSubmit={handleSave} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-name" className="mb-1 block text-sm font-medium">
                  Nama produk *
                </label>
                <input
                  id="edit-name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="edit-price" className="mb-1 block text-sm font-medium">
                  Harga (Rp) *
                </label>
                <input
                  id="edit-price"
                  type="number"
                  min="1"
                  step="1"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="edit-category" className="mb-1 block text-sm font-medium">
                  Kategori *
                </label>
                <select
                  id="edit-category"
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
                <label htmlFor="edit-location" className="mb-1 block text-sm font-medium">
                  Lokasi *
                </label>
                <input
                  id="edit-location"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="edit-description" className="mb-1 block text-sm font-medium">
                  Deskripsi
                </label>
                <textarea
                  id="edit-description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="edit-image" className="mb-1 block text-sm font-medium">
                  URL gambar
                </label>
                <input
                  id="edit-image"
                  type="url"
                  value={form.image_url}
                  onChange={(e) => updateField("image_url", e.target.value)}
                  placeholder="https://contoh.com/gambar.jpg"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-emerald-800 px-5 py-2.5 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>

                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900">
              Produk Saya
            </h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
              {products.length} produk
            </span>
          </div>

          {loading ? (
            <p className="py-10 text-center text-gray-500">
              Memuat produk...
            </p>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-medium text-gray-700">
                Belum ada produk untuk akun ini.
              </p>
              <Link
                href="/vendor2/produk/tambah"
                className="mt-4 inline-block font-semibold text-emerald-800 hover:underline"
              >
                Tambah produk pertama →
              </Link>
            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3">Produk</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Lokasi</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>

                
<tbody className="divide-y divide-gray-100">
  {products.map((product) => (
    <tr key={product.id} className="bg-white">
      <td className="p-3 text-gray-900">
        <p className="font-semibold text-gray-900">
          {product.name}
        </p>
        <p className="mt-1 max-w-xs truncate text-gray-700">
          {product.description || "Tanpa deskripsi"}
        </p>
      </td>

      <td className="p-3 text-gray-900">
        {product.category || "-"}
      </td>

      <td className="p-3 font-medium text-gray-900">
        {Number(product.price).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        })}
      </td>

      <td className="p-3 text-gray-900">
        {product.location || "-"}
      </td>

      <td className="p-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => startEdit(product)}
            className="rounded-md bg-amber-100 px-3 py-2 font-medium text-amber-900 hover:bg-amber-200"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => handleDelete(product)}
            disabled={deletingId === product.id}
            className="rounded-md bg-red-100 px-3 py-2 font-medium text-red-900 hover:bg-red-200 disabled:opacity-60"
          >
            {deletingId === product.id ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
        </section>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-emerald-800 hover:underline"
          >
            ← Kembali ke beranda
          </Link>

          <Link
            href="/admin/penjual"
            className="text-sm font-medium text-emerald-800 hover:underline"
          >
            Buka Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
