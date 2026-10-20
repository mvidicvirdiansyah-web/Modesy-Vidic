
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Application = {
  id: number;
  user_id: string;
  phone: string;
  store_name: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type Profile = {
  id: string;
  full_name: string | null;
};

export default function AdminPenjualPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("Silakan login menggunakan akun admin.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      setIsAdmin(false);
      setMessage("Akses ditolak. Halaman ini khusus admin.");
      setLoading(false);
      return;
    }

    setIsAdmin(true);

    const { data, error } = await supabase
      .from("vendor_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Gagal memuat pendaftar: " + error.message);
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as Application[];
    setApplications(rows);

    if (rows.length > 0) {
      const userIds = [...new Set(rows.map((row) => row.user_id))];

      const { data: profiles, error: namesError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      if (!namesError) {
        const profileRows = (profiles ?? []) as Profile[];
        const nameMap: Record<string, string> = {};

        for (const item of profileRows) {
          nameMap[item.id] = item.full_name || "Nama belum diisi";
        }

        setNames(nameMap);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  async function reviewApplication(
    applicationId: number,
    decision: "approved" | "rejected"
  ) {
    const action = decision === "approved" ? "menyetujui" : "menolak";

    if (!window.confirm(`Yakin ingin ${action} pendaftaran ini?`)) {
      return;
    }

    setProcessingId(applicationId);
    setMessage("");

    const { error } = await supabase.rpc("review_vendor_application", {
      p_application_id: applicationId,
      p_decision: decision,
    });

    if (error) {
      setMessage("Gagal memproses pendaftaran: " + error.message);
      setProcessingId(null);
      return;
    }

    setMessage(
      decision === "approved"
        ? "Pendaftaran berhasil disetujui."
        : "Pendaftaran berhasil ditolak."
    );

    await loadApplications();
    setProcessingId(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-teal-800 hover:underline"
        >
          ← Kembali ke Beranda
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-800">
              Modesy Marketplace
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Kelola Pendaftaran Penjual
            </h1>
            <p className="mt-2 text-gray-600">
              Periksa data toko sebelum memberikan akses penjualan.
            </p>
          </div>

          <button
            onClick={() => void loadApplications()}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Muat Ulang
          </button>
        </div>

        {message && (
          <div
            role="status"
            className="mt-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700"
          >
            {message}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-gray-600">Memuat data pendaftar...</p>
        ) : !isAdmin ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-gray-700">
              Login menggunakan akun yang memiliki peran admin untuk membuka
              halaman ini.
            </p>
            <Link
              href="/auth"
              className="mt-4 inline-block rounded-lg bg-teal-800 px-5 py-3 font-semibold text-white hover:bg-teal-900"
            >
              Masuk
            </Link>
          </div>
        ) : applications.length === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Belum ada pendaftaran
            </h2>
            <p className="mt-2 text-gray-600">
              Pendaftaran penjual akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {application.store_name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Pendaftar:{" "}
                      {names[application.user_id] || "Memuat nama..."}
                    </p>
                  </div>

                  <span
                    className={`h-fit w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                      application.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : application.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.status === "pending"
                      ? "Menunggu"
                      : application.status === "approved"
                        ? "Disetujui"
                        : "Ditolak"}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Nomor telepon
                    </p>
                    <p className="mt-1 text-gray-900">
                      {application.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tanggal pendaftaran
                    </p>
                    <p className="mt-1 text-gray-900">
                      {new Date(application.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">
                    Deskripsi toko
                  </p>
                  <p className="mt-1 whitespace-pre-wrap leading-7 text-gray-700">
                    {application.description}
                  </p>
                </div>

                {application.status === "pending" && (
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                    <button
                      onClick={() =>
                        void reviewApplication(application.id, "approved")
                      }
                      disabled={processingId !== null}
                      className="rounded-lg bg-teal-800 px-5 py-2.5 font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
                    >
                      {processingId === application.id
                        ? "Memproses..."
                        : "Setujui"}
                    </button>

                    <button
                      onClick={() =>
                        void reviewApplication(application.id, "rejected")
                      }
                      disabled={processingId !== null}
                      className="rounded-lg border border-red-200 bg-white px-5 py-2.5 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Tolak
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
