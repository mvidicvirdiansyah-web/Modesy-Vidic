"use client";

const blogs = [
  {
    title: "Tips penting untuk berkemas saat bepergian bagi pecinta fesyen",
    category: "Gaya Hidup",
    time: "3 bulan yang lalu",
    description:
      "Tetap tampil gaya dan terorganisir selama perjalanan Anda dengan kiat-kiat pengemasan cerdas ini.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Psikologi warna dalam dunia mode",
    category: "Mode",
    time: "3 bulan yang lalu",
    description:
      "Pelajari bagaimana warna yang Anda kenakan memengaruhi suasana hati, kepercayaan diri, dan persepsi.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Ide hadiah untuk setiap anggaran, dari yang terjangkau hingga mewah",
    category: "Gaya Hidup",
    time: "3 bulan yang lalu",
    description:
      "Temukan hadiah sempurna tanpa menguras kantong, dengan ide-ide sesuai anggaran.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Panduan pemula untuk wewangian rumah",
    category: "Bisnis",
    time: "3 bulan yang lalu",
    description:
      "Pelajari bagaimana aroma dapat mengubah suasana rumah Anda dan meningkatkan suasana hati.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Cara memadukan pakaian untuk gaya sehari-hari",
    category: "Mode",
    time: "3 bulan yang lalu",
    description:
      "Temukan inspirasi padu padan pakaian yang nyaman dan menarik untuk aktivitas sehari-hari.",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Inspirasi dekorasi rumah minimalis",
    category: "Rumah & Dekorasi",
    time: "3 bulan yang lalu",
    description:
      "Ciptakan ruangan yang nyaman dengan pilihan dekorasi sederhana dan fungsional.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
  },
];

export default function BlogSlider() {
  function slide(direction: number) {
    document.getElementById("blog-slider")?.scrollBy({
      left: direction * 470,
      behavior: "smooth",
    });
  }

  return (
    <section className="w-full px-[22px] py-10">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Postingan Blog Terbaru
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Postingan sebelumnya"
          className="absolute left-4 top-[145px] z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl text-gray-800 shadow-lg transition hover:bg-gray-100"
        >
          ‹
        </button>

        <div
          id="blog-slider"
          className="flex gap-[30px] overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {blogs.map((blog) => (
            <article
              key={blog.title}
              className="w-[85%] flex-none sm:w-[calc(50%-15px)] lg:w-[calc(25%-23px)]"
            >
              <a href="#blog" className="group block overflow-hidden">
                <div className="aspect-[1.5/1] overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </a>

              <h3 className="mt-6 text-xl font-medium leading-8 text-gray-800 transition hover:text-teal-600">
                <a href="#blog">{blog.title}</a>
              </h3>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true">▱</span>
                  {blog.category}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true">◷</span>
                  {blog.time}
                </span>
              </div>

              <p className="mt-5 text-base leading-7 text-gray-500">
                {blog.description}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Postingan berikutnya"
          className="absolute right-4 top-[145px] z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl text-gray-800 shadow-lg transition hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </section>
  );
}