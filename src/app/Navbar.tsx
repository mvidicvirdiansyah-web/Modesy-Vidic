"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Profile = {
  role: "buyer" | "vendor" | "admin";
  vendor_status: "none" | "pending" | "approved" | "rejected";
};

const categories = [
  {
    label: "Pakaian",
    category: "Fashion",
    subcategories: ["Pakaian Pria", "Pakaian Wanita", "Jaket", "Kemeja", "Celana", "Gaun"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Sepatu",
    category: "Fashion",
    subcategories: ["Sneakers", "Sepatu Pria", "Sepatu Wanita", "Boots", "Sandal", "Sepatu Formal"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Rumah & Kehidupan",
    category: "Furnitur",
    subcategories: ["Furnitur", "Dekorasi Rumah", "Bantal", "Dapur", "Pencahayaan", "Peralatan Rumah"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Perhiasan & Aksesori",
    category: "Aksesori",
    subcategories: ["Kalung", "Gelang", "Jam Tangan", "Tas", "Kacamata", "Cincin"],
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Mainan & Hiburan",
    category: "Aksesori",
    subcategories: ["Mainan Anak", "Permainan", "Hobi", "Koleksi", "Kerajinan", "Puzzle"],
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Grafis & Foto",
    category: "Elektronik",
    subcategories: ["Ilustrasi", "Fotografi", "Lukisan", "Desain Grafis", "Digital Art", "Vektor"],
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Video & Audio",
    category: "Elektronik",
    subcategories: ["Video", "Musik", "Audio", "Efek Suara", "Template Video", "Podcast"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Templat & Kode Web",
    category: "Elektronik",
    subcategories: ["Template Website", "UI Kit", "Tema", "Plugin", "Kode", "Template Admin"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile(currentUser: User | null) {
      if (!active) return;

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role, vendor_status")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error("Gagal memuat profil:", error.message);
        setProfile(null);
      } else {
        setProfile(data as Profile | null);
      }

      setLoading(false);
    }

    supabase.auth.getSession().then(({ data }) => {
      void loadProfile(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void loadProfile(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Gagal keluar: " + error.message);
      return;
    }

    setUser(null);
    setProfile(null);
    router.push("/");
    router.refresh();
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();

    router.push(
      query ? `/?q=${encodeURIComponent(query)}#produk` : "/#produk"
    );
  }

  const isApprovedVendor =
    profile?.role === "vendor" && profile?.vendor_status === "approved";

  return (
    <header
      className="relative z-50 w-full bg-white text-[#555555]"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      {/* TOP BAR */}
      <div className="border-b border-[#eeeeee]">
        <div className="mx-auto flex min-h-[38px] max-w-[1600px] items-center justify-between gap-3 px-4 text-[12px] sm:px-6 sm:text-[13px]">
          <div className="flex items-center gap-4">
            <Link href="#tentang" className="transition hover:text-[#00a99d]">
              Kontak
            </Link>
            <Link href="/vendor/daftar" className="hidden transition hover:text-[#00a99d] sm:inline">
              Jual di Modesy
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden md:inline">⌖ Lokasi</span>
            <span className="hidden sm:inline">USD ($)⌄</span>
            <span className="hidden lg:inline">Bahasa Inggris⌄</span>

            {loading ? (
              <span>Memuat...</span>
            ) : !user ? (
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Link href="/auth" className="hover:text-[#00a99d]">Login</Link>
                <span>/</span>
                <Link href="/auth" className="hover:text-[#00a99d]">Daftar</Link>
              </div>
            ) : (
              <button type="button" onClick={handleLogout} className="whitespace-nowrap transition hover:text-[#00a99d]">
                Keluar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b border-[#eeeeee]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-4 py-5 sm:px-6 lg:flex-nowrap lg:gap-6">
          <Link href="/" aria-label="Modesy beranda" className="shrink-0 text-[36px] font-medium leading-none tracking-[-2px] text-[#555555] sm:text-[42px]">
            M<span className="text-[#00a99d]">o</span>desy
          </Link>

          <form onSubmit={handleSearch} className="order-3 flex h-[48px] w-full min-w-0 overflow-hidden bg-[#f5f5f5] lg:order-none lg:ml-5 lg:flex-1">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari produk, kategori, atau merek..."
              aria-label="Cari produk, kategori, atau merek"
              className="min-w-0 flex-1 bg-transparent px-4 text-[14px] outline-none placeholder:text-[#999999] sm:px-5"
            />
            <button type="submit" aria-label="Cari" className="px-5 text-[25px] transition hover:text-[#00a99d]">
              ⌕
            </button>
          </form>

          <div className="ml-auto flex items-center gap-4 sm:gap-5">
            <Link href="#produk" className="flex items-center gap-2 hover:text-[#00a99d]">
              <span className="text-[27px]">🛒</span>
              <span className="hidden whitespace-nowrap text-[13px] xl:inline">Keranjang</span>
            </Link>

            <Link href="#produk" className="flex items-center gap-2 hover:text-[#00a99d]">
              <span className="text-[30px] leading-none">♡</span>
              <span className="hidden whitespace-nowrap text-[13px] xl:inline">Daftar Keinginan</span>
            </Link>

            <Link href="/vendor/daftar" className="hidden h-[44px] items-center justify-center whitespace-nowrap bg-[#00a99d] px-5 text-[13px] font-medium text-white transition hover:bg-[#008f86] sm:flex">
              Jual Sekarang
            </Link>

            {user && (
              <div className="hidden text-[12px] lg:block">
                {isApprovedVendor ? (
                  <Link href="/vendor" className="font-semibold hover:text-[#00a99d]">Dashboard</Link>
                ) : profile?.role === "admin" ? (
                  <span className="font-semibold">Admin</span>
                ) : (
                  <Link href="/vendor/daftar" className="font-semibold hover:text-[#00a99d]">
                    {profile?.vendor_status === "pending"
                      ? "Pengajuan Diproses"
                      : profile?.vendor_status === "rejected"
                        ? "Ajukan Ulang"
                        : "Jadi Vendor"}
                  </Link>
                )}
              </div>
            )}

            <button
              type="button"
              aria-label="Buka menu kategori"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl sm:hidden"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP CATEGORY NAVIGATION */}
      <nav className="relative hidden border-b border-[#eeeeee] bg-white sm:block">
        <div className="mx-auto flex h-[52px] max-w-[1600px] items-center gap-6 overflow-x-auto px-5 text-[13px] lg:gap-7 lg:text-[14px]">
          {categories.map((item) => (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => setHoveredCategory(item.label)}
              onFocus={() => setHoveredCategory(item.label)}
              onClick={() => {
                router.push(`/?category=${encodeURIComponent(item.category)}#produk`);
                setHoveredCategory(null);
              }}
              className={`h-full shrink-0 whitespace-nowrap border-b-2 transition ${
                hoveredCategory === item.label
                  ? "border-[#00a99d] text-[#00a99d]"
                  : "border-transparent text-[#333333] hover:text-[#00a99d]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {categories.map((item) =>
          hoveredCategory === item.label ? (
            <div
              key={item.label}
              className="absolute left-0 top-full z-[60] w-full border border-[#eeeeee] bg-white shadow-xl"
              onMouseEnter={() => setHoveredCategory(item.label)}
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 p-8 md:grid-cols-[1fr_300px]">
                <div>
                  <h3 className="mb-5 border-b border-gray-100 pb-4 text-lg font-semibold text-gray-800">
                    {item.label}
                  </h3>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                    {item.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        href={`/?category=${encodeURIComponent(item.category)}#produk`}
                        onClick={() => setHoveredCategory(null)}
                        className="text-sm text-gray-600 transition hover:text-[#00a99d]"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/?category=${encodeURIComponent(item.category)}#produk`}
                    onClick={() => setHoveredCategory(null)}
                    className="mt-7 inline-block text-sm font-semibold text-[#00a99d] hover:underline"
                  >
                    Lihat Semua {item.label} →
                  </Link>
                </div>

                <Link
                  href={`/?category=${encodeURIComponent(item.category)}#produk`}
                  onClick={() => setHoveredCategory(null)}
                  className="group hidden overflow-hidden md:block"
                >
                  <img src={item.image} alt={item.label} className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-105" />
                  <p className="mt-3 text-sm font-semibold text-gray-700">
                    Jelajahi {item.label}
                  </p>
                </Link>
              </div>
            </div>
          ) : null
        )}
      </nav>

      {/* MOBILE CATEGORY NAVIGATION */}
      {mobileMenuOpen && (
        <nav className="border-b border-gray-200 bg-white p-4 sm:hidden">
          <div className="flex flex-col">
            {categories.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setHoveredCategory(hoveredCategory === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between py-3 text-left text-sm"
                >
                  {item.label}
                  <span>{hoveredCategory === item.label ? "−" : "+"}</span>
                </button>

                {hoveredCategory === item.label && (
                  <div className="grid grid-cols-2 gap-3 pb-4 pl-3">
                    {item.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        href={`/?category=${encodeURIComponent(item.category)}#produk`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setHoveredCategory(null);
                        }}
                        className="text-xs text-gray-600 hover:text-[#00a99d]"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}