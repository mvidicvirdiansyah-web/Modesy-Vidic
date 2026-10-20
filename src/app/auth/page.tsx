
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (mode === "register") {
        const { data, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName.trim(),
              },
            },
          });

        if (signUpError) throw signUpError;

        if (data.session && data.user) {
          setMessage("Pendaftaran berhasil! Mengalihkan halaman...");

          const { data: profile, error: profileError } =
            await supabase
              .from("profiles")
              .select("role")
              .eq("id", data.user.id)
              .single();

          if (profileError) {
            router.replace("/");
          } else if (profile.role === "admin") {
            router.replace("/admin/penjual");
          } else {
            router.replace("/");
          }

          router.refresh();
        } else {
          setMessage(
            "Pendaftaran berhasil. Silakan cek email untuk mengonfirmasi akun sebelum login."
          );
        }
      } else {
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (loginError) throw loginError;

        const { data: profile, error: profileError } =
          await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

        if (profileError) {
          throw new Error(
            "Login berhasil, tetapi profil tidak ditemukan. Periksa tabel profiles di Supabase."
          );
        }

        setMessage("Login berhasil! Mengalihkan halaman...");

        if (profile.role === "admin") {
          router.replace("/admin/penjual");
        } else {
          router.replace("/");
        }

        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← Kembali ke beranda
        </Link>

        <div className="mt-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
            🛍️
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {mode === "login"
              ? "Selamat datang!"
              : "Buat akun baru"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {mode === "login"
              ? "Login untuk melanjutkan ke Modesy."
              : "Daftar sebagai pembeli terlebih dahulu."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "register" && (
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Nama lengkap
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="nama@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength={6}
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
              placeholder="Minimal 6 karakter"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {message && (
            <p
              role="status"
              className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Memproses..."
              : mode === "login"
                ? "Login"
                : "Daftar akun"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === "login"
            ? "Belum punya akun?"
            : "Sudah punya akun?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
              setMessage("");
            }}
            className="font-semibold text-emerald-800 hover:underline"
          >
            {mode === "login"
              ? "Daftar sekarang"
              : "Login di sini"}
          </button>
        </p>
      </div>
    </main>
  );
}
