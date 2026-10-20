
import Link from "next/link";
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import BrandSlider from "./BrandSlider";
import BlogSlider from "./BlogSlider";

const categories = [
  {
    name: "Clothing",
    image:
     "https://modesy.codingest.net/uploads/category/category_64fa3284422356-62618554.webp"
  },
  {
    name: "Home & Living",
    image:
     "https://modesy.codingest.net/uploads/category/category_64fa32d947a2c2-95720633.webp"
  },
  {
    name: "Toys & Entertainment",
    image:
     "https://modesy.codingest.net/uploads/category/category_64fa33016cd3d5-22961515.webp"
  },
  {
    name: "Women's Clothing",
    image:
      "https://modesy.codingest.net/uploads/category/category_64fa33130537d7-29441060.webp"
  },
  {
    name: "Men's Clothing",
    image:
      "https://modesy.codingest.net/uploads/category/category_64fa3334490a07-19765633.webp"
  },
  {
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Jewelry & Accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Graphics",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Painting",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Boots",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Decorative Pillows",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Handbags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
  },
];


const specialOffers = [
  {
    name: "Animal Colorful Digital Prints",
    seller: "Trendshop",
    price: 29,
    oldPrice: 39,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Summer Fashion Top",
    seller: "Trendshop",
    price: 65,
    oldPrice: 79,
    discount: 17,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Women Lace Blouse",
    seller: "Trendshop",
    price: 69,
    oldPrice: 79,
    discount: 12,
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Floral Women Sundress",
    seller: "Admin",
    price: 80,
    oldPrice: 89,
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative min-h-[460px] overflow-hidden bg-[#e8e0d7] sm:min-h-[500px] lg:min-h-[560px]">
        <img
          src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=2200&q=90"
          alt="Koleksi ransel terbaru"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

        <div className="relative mx-auto flex min-h-[460px] max-w-[1600px] items-center px-5 py-16 sm:min-h-[500px] sm:px-10 lg:min-h-[560px] lg:px-16">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">
              Discover Something Unique
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Find Backpacks That
              <br />
              Best Suit You
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              Temukan koleksi produk pilihan dengan desain menarik,
              kualitas terbaik, dan harga yang sesuai untuk kebutuhanmu.
            </p>

            <Link
              href="#produk"
              className="mt-8 inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-semibold text-gray-900 transition hover:bg-teal-600 hover:text-white"
            >
              Shop Now <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <Link
          href="#kategori"
          aria-label="Slide sebelumnya"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-gray-800 transition hover:bg-white sm:left-6 sm:h-12 sm:w-12"
        >
          ‹
        </Link>

        <Link
          href="#kategori"
          aria-label="Slide berikutnya"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-gray-800 transition hover:bg-white sm:right-6 sm:h-12 sm:w-12"
        >
          ›
        </Link>
      </section>

      {/* Shop By Category */}
      <section
        id="kategori"
        className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-teal-600">
              Browse Collections
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Shop By Category
            </h2>
          </div>

          <Link
            href="#produk"
            className="shrink-0 text-sm font-medium transition hover:text-teal-600"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/?category=${encodeURIComponent(category.name)}#produk`}
              className="group text-center"
            >
              <div className="mx-auto aspect-square w-full max-w-[210px] overflow-hidden rounded-full bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-sm font-medium transition group-hover:text-teal-600 sm:text-base">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section
        id="special-offers"
        className="w-full px-[22px] py-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Special Offers
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {[
            ...specialOffers,
            {
              name: "Gucci nylon fabric smart backpack",
              seller: "Admin",
              price: 55,
              oldPrice: 69,
              discount: 20,
              image:
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Black sneakers with white sole",
              seller: "Admin",
              price: 69,
              oldPrice: 89,
              discount: 22,
              image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
            },
          ].map((product) => (
            <article
              key={product.name}
              className="group min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white"
            >
              <Link
                href="#produk"
                className="relative block overflow-hidden bg-gray-100"
              >
                <div className="relative aspect-[3/3.1] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />

                  <img
                    src={product.hoverImage || product.image}
                    alt={`${product.name} - foto kedua`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <span className="absolute left-0 top-0 rounded-br-xl bg-[#ff3045] px-3 py-2 text-sm font-semibold text-white">
                  -{product.discount}%
                </span>
              </Link>

              <div className="min-h-[150px] p-3">
                <Link
                  href="#produk"
                  className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900 transition hover:text-teal-600"
                >
                  {product.name}
                </Link>

                <p className="mt-1 text-sm text-gray-500">
                  {product.seller}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-green-600">
                    ${product.price}
                  </span>

                  <span className="text-sm font-semibold text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
 


    


      {/* Promotion Banners */}
      <section className="w-full px-5 pb-10 pt-2">
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
          <Link
            href="#special-offers"
            className="group relative block aspect-[1.84/1] overflow-hidden bg-[#fff5d9]"
          >
            <img
           src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85"
              alt="Summer collection promotion"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
              <div className="max-w-[70%] bg-white/95 px-5 py-6 text-center shadow-sm sm:px-8 sm:py-8">
                <p className="text-2xl font-semibold italic text-amber-500 sm:text-4xl">
                  Summer
                </p>
                <p className="mt-3 text-sm font-semibold text-gray-900 sm:text-xl">
                  Choose your style, make your summer.
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-700">
                  Discount 25%
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="#special-offers"
            className="group relative block aspect-[1.84/1] overflow-hidden bg-gray-100"
          >
            <img
             src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85"
              alt="Autumn sale promotion"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 p-4">
              <div className="max-w-[70%] text-center text-white drop-shadow-lg">
                <p className="text-3xl font-bold italic sm:text-5xl">
                  Autumn Sale
                </p>
                <p className="mt-3 text-sm font-medium sm:text-lg">
                  Limited Time Offer
                </p>
                <span className="mt-5 inline-block bg-[#829582] px-5 py-3 text-sm font-bold sm:text-lg">
                  50% OFF
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

  {/* Featured Products */}
      <section
        id="special-offers"
        className="w-full px-[22px] py-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
         Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {[
            {
              name: "Rok midi hitam dengan motif bunga putih",
  seller: "Trendshop",
  price: 48,
  oldPrice: 55,
  image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80",
  hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",

            },
            {
               name: "Bantal dekoratif buatan tangan",
  seller: "Admin",
  price: 59,
  oldPrice: 69,
  image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
  hoverImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Gaun musim panas wanita bermotif bunga",
  seller: "Admin",
  price: 80,
  oldPrice: 89,
  image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
  hoverImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
            },
            {
                name: "Topi pelindung matahari untuk wanita",
  seller: "Trendshop",
  price: 29,
  image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80",
  hoverImage: "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Sepatu kets pria",
  seller: "Trendshop",
  price: 89,
  oldPrice: 100,
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  hoverImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
            },
            {
             name: "Tas tangan Kipling Bailey Saddle",
  seller: "Admin",
  price: 59,
  oldPrice: 69,
  image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
            },
          ].map((product) => (
            <article
              key={product.name}
              className="group min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white"
            >
              <Link
                href="#produk"
                className="relative block overflow-hidden bg-gray-100"
              >
                <div className="relative aspect-[3/3.1] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />

                  <img
                    src={product.hoverImage}
                    alt={`${product.name} - foto kedua`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

              
              </Link>

              <div className="min-h-[150px] p-3">
                <Link
                  href="#produk"
                  className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900 transition hover:text-teal-600"
                >
                  {product.name}
                </Link>

                <p className="mt-1 text-sm text-gray-500">
                  {product.seller}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-green-600">
                    ${product.price}
                  </span>

                  <span className="text-sm font-semibold text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


 {/* New Arrivals */}
      <section
        id="special-offers"
        className="w-full px-[22px] py-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
         New Arrivals
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {[
            {
              name: "Men Casual Summer Outfit",
              seller: "Trendshop",
              price: 29,
              oldPrice: 39,
              discount: 25,
              image:
                "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Classic Men's White Shirt",
              seller: "Trendshop",
              price: 65,
              oldPrice: 79,
              discount: 17,
              image:
                "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
              
               hoverImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Men's Casual Black T-Shirt",
              seller: "Trendshop",
              price: 69,
              oldPrice: 79,
              discount: 12,
              image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Men's Casual Jacket",
              seller: "Admin",
              price: 80,
              oldPrice: 89,
              discount: 10,
              image:
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Classic Men's Backpack",
              seller: "Admin",
              price: 55,
              oldPrice: 69,
              discount: 20,
              image:
                "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
            },
            {
              name: "Men's Black Sneakers",
              seller: "Admin",
              price: 69,
              oldPrice: 89,
              discount: 22,
              image:
                "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=600&q=80",
              hoverImage:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            },
          ].map((product) => (
            <article
              key={product.name}
              className="group min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white"
            >
              <Link
                href="#produk"
                className="relative block overflow-hidden bg-gray-100"
              >
                <div className="relative aspect-[3/3.1] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />

                  <img
                    src={product.hoverImage}
                    alt={`${product.name} - foto kedua`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

              
              </Link>

              <div className="min-h-[150px] p-3">
                <Link
                  href="#produk"
                  className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900 transition hover:text-teal-600"
                >
                  {product.name}
                </Link>

                <p className="mt-1 text-sm text-gray-500">
                  {product.seller}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-green-600">
                    ${product.price}
                  </span>

                  <span className="text-sm font-semibold text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


{/* Promotion Banners */}
<section className="w-full px-[22px] py-8">
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    <a href="#produk" className="block overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
        alt="New Summer Collection"
        className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </a>

    <a href="#produk" className="block overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
        alt="Limited Time Sale"
        className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </a>

    <a href="#produk" className="block overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85"
        alt="Summer Collection Sale"
        className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </a>
  </div>
</section>


     


{/* Section Pakaian Baru */}
<section id="pakaian" className="w-full px-[22px] py-8">
  <div className="mb-7 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
      Pakaian
    </h2>

    <Link
      href="/kategori/pakaian"
      className="flex items-center gap-2 text-lg font-medium text-gray-900 transition hover:text-teal-600"
    >
      Lihat Semua <span aria-hidden="true">→</span>
    </Link>
  </div>

  <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    {[
      {
        name: "Gaun Motif Polkadot",
        seller: "Trendshop",
        price: 130,
        oldPrice: 150,
        image:
          "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Rok Midi Motif Bunga",
        seller: "Trendshop",
        price: 48,
        oldPrice: 55,
        image:
          "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Gaun Musim Panas",
        seller: "Admin",
        price: 80,
        oldPrice: 89,
        image:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Jaket Pria Navy",
        seller: "Trendshop",
        price: 89,
        oldPrice: 99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Blus Hitam Wanita",
        seller: "Trendshop",
        price: 69,
        oldPrice: 79,
        image:
          "https://images.unsplash.com/photo-1564257577-7a5e1c1d3b5c?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Gaun Kasual Wanita",
        seller: "Admin",
        price: 56,
        image:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
      },
    ].map((product) => (
      <article
        key={product.name}
        className="group min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white"
      >
        <Link
          href="#produk"
          className="block overflow-hidden bg-gray-100"
        >
          <div className="aspect-[3/3.1] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="min-h-[150px] p-3">
          <Link
            href="#produk"
            className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900 transition hover:text-teal-600"
          >
            {product.name}
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            {product.seller}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-base font-bold text-green-600">
              ${product.price}
            </span>

            {product.oldPrice && (
              <span className="text-sm font-semibold text-gray-500 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </article>
    ))}
  </div>
</section>


{/* Section Perhiasan & Aksesoris */}
<section
  id="perhiasan-aksesoris"
  className="w-full px-[22px] py-8"
>
  <div className="mb-7 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
      Perhiasan & Aksesoris
    </h2>

    <Link
      href="/kategori/aksesoris"
      className="flex items-center gap-2 text-lg font-medium text-gray-900 transition hover:text-teal-600"
    >
      Lihat Semua <span aria-hidden="true">→</span>
    </Link>
  </div>

  <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    {[
      {
        name: "Syal wanita warna-warni",
        seller: "Trendshop",
        price: 40,
        oldPrice: 45,
        image:
          "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Tas ransel wanita warna hitam",
        seller: "Trendshop",
        price: 55,
        oldPrice: 65,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Tas tangan Kipling Bailey Saddle",
        seller: "Admin",
        price: 59,
        oldPrice: 69,
        image:
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Tas tangan biru modern",
        seller: "Trendshop",
        price: 45,
        oldPrice: 60,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Topi pelindung matahari untuk wanita",
        seller: "Trendshop",
        price: 29,
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Tas tangan lucu buatan tangan",
        seller: "Admin",
        price: 30,
        oldPrice: 45,
        image:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
      },
    ].map((product) => (
      <article
        key={product.name}
        className="group min-w-0 overflow-hidden rounded-md border border-gray-200 bg-white"
      >
        <Link
          href="#produk"
          className="block overflow-hidden bg-gray-100"
        >
          <div className="aspect-[3/3.1] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="min-h-[150px] p-3">
          <Link
            href="#produk"
            className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900 transition hover:text-teal-600"
          >
            {product.name}
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            {product.seller}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`text-base font-bold ${
                product.oldPrice ? "text-green-600" : "text-gray-900"
              }`}
            >
              ${product.price}
            </span>

            {product.oldPrice && (
              <span className="text-sm font-semibold text-gray-500 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </article>
    ))}
  </div>
</section>

<BrandSlider />

<BlogSlider />


{/* Latest Blog Posts */}
<section id="blog" className="w-full px-[22px] py-10 sm:py-12">
  <div className="mb-8 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
      Postingan Blog Terbaru
    </h2>

    <Link
      href="#blog"
      className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-900 transition hover:text-teal-600 sm:text-base"
    >
      Lihat Semua <span aria-hidden="true">→</span>
    </Link>
  </div>

  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
    {[
      {
        title: "Tips penting untuk berkemas saat bepergian bagi pecinta fesyen",
        category: "Gaya Hidup",
        date: "3 bulan yang lalu",
        description:
          "Tetap tampil gaya dan terorganisir selama perjalanan Anda dengan kiat-kiat pengemasan cerdas ini.",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Psikologi warna dalam dunia mode",
        category: "Mode",
        date: "3 bulan yang lalu",
        description:
          "Pelajari bagaimana warna yang Anda kenakan memengaruhi suasana hati, kepercayaan diri, dan persepsi.",
        image:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Ide hadiah untuk setiap anggaran, dari yang terjangkau hingga mewah",
        category: "Gaya Hidup",
        date: "3 bulan yang lalu",
        description:
          "Temukan hadiah sempurna tanpa menguras kantong, dengan ide-ide yang sesuai untuk setiap anggaran.",
        image:
          "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
      },
      {
        title: "Panduan pemula untuk wewangian rumah",
        category: "Bisnis",
        date: "3 bulan yang lalu",
        description:
          "Pelajari bagaimana aroma dapat mengubah suasana rumah Anda dan meningkatkan suasana hati.",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
      },
    ].map((post) => (
      <article key={post.title} className="group min-w-0">
        <Link href="#blog" className="block overflow-hidden bg-gray-100">
          <div className="aspect-[1.35/1] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <h3 className="mt-5 text-xl font-medium leading-8 text-gray-900 transition group-hover:text-teal-600">
          <Link href="#blog">{post.title}</Link>
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">▱</span>
            {post.category}
          </span>

          <span className="flex items-center gap-2">
            <span aria-hidden="true">◷</span>
            {post.date}
          </span>
        </div>

        <p className="mt-5 text-base leading-7 text-gray-600">
          {post.description}
        </p>
      </article>
    ))}
  </div>
</section>



      {/* Footer */}
     
{/* Footer */}


<footer
  id="tentang"
  className="w-full bg-[#fafafd] px-6 pb-0 pt-10 text-[#171717] sm:px-6"
>
  <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-2 xl:grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] xl:gap-8">

    {/* Logo dan Media Sosial */}
    <div>
      <Link
        href="/"
        className="inline-block text-5xl font-semibold tracking-tight text-[#484848]"
      >
        M<span className="text-[#00a99d]">o</span>desy
      </Link>

      <p className="mt-5 max-w-[460px] text-sm leading-6 text-[#555555]">
        Modesy is a modern e-commerce marketplace where buyers and
        sellers connect with ease. Whether you are looking to shop
        for unique items or grow your business by selling online,
        Modesy is here to help you every step of the way.
      </p>

      <div className="mt-5 flex max-w-[460px] flex-wrap gap-2.5">
        {[
          { name: "Facebook", icon: "f" },
          { name: "X", icon: "𝕏" },
          { name: "Instagram", icon: "◎" },
          { name: "TikTok", icon: "♪" },
          { name: "WhatsApp", icon: "☏" },
          { name: "YouTube", icon: "▶" },
          { name: "Discord", icon: "♟" },
          { name: "Telegram", icon: "➤" },
          { name: "Pinterest", icon: "℘" },
          { name: "LinkedIn", icon: "in" },
          { name: "Twitch", icon: "▣" },
          { name: "VK", icon: "ᴠκ" },
          { name: "RSS", icon: "◔" },
        ].map((social) => (
          <a
            key={social.name}
            href="#tentang"
            aria-label={social.name}
            title={social.name}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8c8c8] text-base font-semibold text-[#777777] transition hover:border-[#00a99d] hover:text-[#00a99d]"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>

    {/* Categories */}
    <div>
      <h3 className="mb-5 text-base font-medium">CATEGORIES</h3>

      <ul className="space-y-3.5 text-sm text-[#292929]">
        {[
          "Clothing",
          "Shoes",
          "Home & Living",
          "Jewelry & Accessories",
          "Toys & Entertainment",
          "Graphics & Photos",
          "Video & Audio",
          "Web Templates & Code",
        ].map((item) => (
          <li key={item}>
            <Link
              href="#kategori"
              className="transition hover:text-[#00a99d]"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="mb-5 text-base font-medium">QUICK LINKS</h3>

      <ul className="space-y-3.5 text-sm text-[#292929]">
        {[
          { label: "Home", href: "/" },
          { label: "Blog", href: "#blog" },
          { label: "Shops", href: "#produk" },
          { label: "Help Center", href: "#tentang" },
        ].map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="transition hover:text-[#00a99d]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mb-5 mt-5 text-base font-medium">INFORMATION</h3>

      <ul className="space-y-3.5 text-sm text-[#292929]">
        <li>
          <Link href="#tentang" className="hover:text-[#00a99d]">
            Terms &amp; Conditions
          </Link>
        </li>
        <li>
          <Link href="#tentang" className="hover:text-[#00a99d]">
            About Us
          </Link>
        </li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="mb-5 text-base font-medium">NEWSLETTER</h3>

      <p className="text-sm leading-6 text-[#555555]">
        Join our subscribers list to get the latest news, updates
        and special offers directly in your inbox
      </p>

      <form action="#tentang" className="mt-5 space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Enter your email"
          className="h-[52px] w-full rounded border border-[#dedede] bg-white px-5 text-sm outline-none transition focus:border-[#00a99d]"
        />

        <button
          type="submit"
          className="h-[52px] w-full rounded bg-[#00a99d] text-sm font-medium text-white transition hover:bg-[#008f85]"
        >
          Subscribe
        </button>
      </form>

      {/* Payment Methods */}
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <span className="text-2xl font-black italic tracking-tight text-[#1939c6]">
          VISA
        </span>

        <svg
          viewBox="0 0 52 34"
          className="h-7 w-10"
          aria-label="Mastercard"
          role="img"
        >
          <circle cx="19" cy="17" r="15" fill="#eb001b" />
          <circle cx="33" cy="17" r="15" fill="#f79e1b" />
          <path
            d="M26 5.5a15 15 0 0 1 0 23 15 15 0 0 1 0-23"
            fill="#ff5f00"
          />
        </svg>

        <svg
          viewBox="0 0 72 36"
          className="h-7 w-[50px]"
          aria-label="Maestro"
          role="img"
        >
          <circle cx="25" cy="18" r="16" fill="#0066b3" />
          <circle cx="47" cy="18" r="16" fill="#e30613" />
          <text
            x="36"
            y="21"
            fontSize="7"
            fill="white"
            textAnchor="middle"
          >
            Maestro
          </text>
        </svg>

        <div className="flex h-7 w-[48px] items-center justify-center rounded-sm bg-[#2166b1] px-1 text-center text-[8px] font-black leading-3 text-white">
          AMERICAN
          <br />
          EXPRESS
        </div>

        <div className="flex h-7 w-[48px] items-center justify-center rounded-sm bg-[#eeeeee] text-center text-[8px] font-black text-[#333333]">
          DISCOVER
        </div>
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="flex min-h-[65px] flex-col justify-between gap-3 border-t border-[#e7e7e7] py-5 text-sm text-[#666666] sm:flex-row sm:items-center">
    <p>Copyright 2025 Modesy - All Rights Reserved.</p>

    <div className="flex flex-wrap gap-5 text-[#292929]">
      <Link href="#tentang" className="hover:text-[#00a99d]">
        Privacy Policy
      </Link>

      <Link href="#tentang" className="hover:text-[#00a99d]">
        Cookie Policy
      </Link>
    </div>
  </div>
</footer>



    </main>
  );
}