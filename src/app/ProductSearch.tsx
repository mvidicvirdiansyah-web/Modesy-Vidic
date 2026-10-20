
"use client";

import { useState } from "react";

type ProductSearchProps = {
  onSearch: (keyword: string) => void;
};

export default function ProductSearch({
  onSearch,
}: ProductSearchProps) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(keyword.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex max-w-xl gap-2 rounded-xl bg-white p-2"
    >
      <input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Cari barang yang kamu inginkan..."
        className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-800 outline-none"
      />

      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
      >
        Cari
      </button>
    </form>
  );
}
