"use client";

const brands = [
  { name: "Adidas", style: "text-4xl font-black italic tracking-tighter" },
  { name: "ARMANI", style: "text-2xl font-light tracking-[0.2em]" },
  { name: "BURBERRY", style: "text-2xl font-bold tracking-tight" },
  { name: "DIESEL", style: "text-3xl font-black italic" },
  { name: "Dockers", style: "text-3xl font-bold" },
  { name: "GUCCI", style: "text-3xl font-serif font-bold tracking-widest" },
  { name: "H&M", style: "text-4xl font-black" },
  { name: "BOSS", style: "text-4xl font-black tracking-widest" },
];

export default function BrandSlider() {
  function scrollBrands(direction: number) {
    document.getElementById("brand-slider")?.scrollBy({
      left: direction * 250,
      behavior: "smooth",
    });
  }

  return (
    <section className="w-full px-[22px] py-10">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Belanja Berdasarkan Merek
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollBrands(-1)}
          aria-label="Merek sebelumnya"
          className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl shadow-lg hover:bg-gray-100"
        >
          ‹
        </button>

        <div
          id="brand-slider"
          className="flex overflow-x-auto border-l border-t border-gray-200 scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-[150px] min-w-[50%] items-center justify-center border-b border-r border-gray-200 px-5 sm:min-w-[33.333%] lg:min-w-[25%]"
            >
              <span
                className={`${brand.style} whitespace-nowrap text-gray-800`}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBrands(1)}
          aria-label="Merek berikutnya"
          className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl shadow-lg hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </section>
  );
}