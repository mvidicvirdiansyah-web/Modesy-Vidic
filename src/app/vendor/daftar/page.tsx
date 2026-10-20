
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DaftarPenjualPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Silakan login terlebih dahulu.");
        router.push("/auth");
        return;
      }

      const { error } = await supabase.rpc("apply_as_vendor", {
        p_full_name: fullName,
        p_phone: phone,
        p_store_name: storeName,
        p_description: description,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setSuccess(true);
      setMessage("Pendaftaran berhasil dikirim! Tunggu persetujuan admin.");
    } catch {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-teal-800 hover:underline">
          ← Kembali ke halaman utama
        </Link>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-800">
            Modesy Marketplace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Daftar Menjadi Penjual
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            Lengkapi data toko kamu. Admin akan memeriksa pendaftaran sebelum
            fitur penjualan diaktifkan.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama lengkap
              </label>
              <input
                id="fullName"
                required
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nomor telepon
              </label>
              <input
                id="phone"
                type="tel"
                required
                maxLength={25}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="Contoh: 08xxxxxxxxxx"
              />
            </div>

            <div>
              <label
                htmlFor="storeName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama toko
              </label>
              <input
                id="storeName"
                required
                maxLength={100}
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className={inputClass}
                placeholder="Contoh: Toko Barang Bagus"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Deskripsi toko
              </label>
              <textarea
                id="description"
                required
                maxLength={1000}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
                placeholder="Jelaskan barang yang akan kamu jual"
              />
            </div>

            {message && (
              <div
                role="status"
                className={`rounded-lg p-4 text-sm ${
                  success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            {success ? (
              <Link
                href="/"
                className="block rounded-lg bg-teal-800 px-5 py-3 text-center font-semibold text-white hover:bg-teal-900"
              >
                Kembali ke Beranda
              </Link>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-teal-800 px-5 py-3 font-semibold text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Mengirim..." : "Kirim Pendaftaran"}
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
