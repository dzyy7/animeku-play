import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CatalogFilters from "@/app/components/CatalogFilters";
import CatalogGrid from "@/app/components/CatalogGrid";

// Sample anime data
const animeData = [
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-EV3u8ylVyD6DYmt0RdZu83oTMsEpcGeHgXrk6fkcpp-Eb3U9zqApz_NYiKftdg9PYG0rD4VwbIDHBca7i1XjcC3nraa_HQi1KDfBouGG91Z4XXgR5vE_8-diHX33j-cowcMfuXTfqcTDnSWPNsVwoNRa93oOt1GhH21wNdI4bOnym6FH30cNIEGZg-NXLcFh5dnd3ENqlfc5lo1ipHaSLgkxVdjcZCRXSqoi3S5XZ6EJTCbCCstDtDTB4eyDD5VX0mufTuhJkwE",
    hasSub: true,
    hasDub: true,
    rating: "4.9",
    genres: ["Action", "Shonen"],
  },
  {
    id: "cyber-edge",
    title: "Cyber Edge",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT-4eTzX5z5I927g6OFqZ0FhhzH_w5BgH-ZYKTChbzAXC8edsFe8HoDxOzlT0F3mvSNpTzHsgsNM3XdIFf4ile_4PlUC7ITZSo7SgVHEUjWQ0MdM0OVw8wb5lQnc1PtFb138cOlbbjriXPVi6Z3iBdkHfjtA5gsdmx0kFEaTRJsPGQjQ6g0C9JJ0xghZDsVI1l8VH1dtsCK_nwKPhSF_QcublO7aGOd2TlawYtx5qp3zXcdh8meGvbs8WM9DxUFn2tXLKklkrDWnQ",
    hasSub: true,
    hasDub: false,
    rating: "4.7",
    genres: ["Sci-Fi", "Action"],
  },
  {
    id: "skyward-bound",
    title: "Skyward Bound",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzheFvFPJKUQaXnLh06deg1YH0SWIEfwypZWeH4bi75otsAbS7_ghwyMUYhvDksIW3XYFiac_OROsMHV_rUcUSIvDw9GH9-_Y1BJ2PtwIySY5SkvU8NCWnDv9gw3HoWnRnae5vW7f9SL3-M3bm4PGawcSY355Uwzk3TpTKJ6q429iuaLF3NFbfLIiTKVxULUmewqJH7z98nBuG4d9tQPYHsTGpa-Wp0luRtS7FP44UonGFRC9OsvXnbElXfljprDt2ALCqHj6wW-4",
    hasSub: true,
    hasDub: true,
    rating: "4.8",
    genres: ["Isekai", "Action"],
  },
  {
    id: "spring-memories",
    title: "Spring Memories",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8tMy-5miUq0sytMdLvqb0qQhyMGoB2P72ixuUVAICQMdTkiK8nd00t3xa6FSuqtPZJGMN3zFNcPVliyuVJf6UsvjrXvTGvfVbianEbK2tcO0f0wUqPMSEuwARtXUTL5TFH4hBUUhiXnSmEUI2CVVWOl0qhgw1cWmxvXUdkcnkrAGHm4jcD5sEPRhvdLpyATnmOrtJmirspWAsubk6anztk6tqZ6l69Uqw_DEAsoe49-qTMn8RPWQs_F_y9XLLC8YAJX7u6xgt6s8",
    hasSub: true,
    hasDub: false,
    rating: "4.5",
    genres: ["Slice of Life", "Romance"],
  },
  {
    id: "night-stalker",
    title: "Night Stalker",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASZBGZdoTLPS-bjgnWdgRm7t06TEePaARgeESfTObkIhPCx0oPJVlvWWZPxA23x2HqFHOc6eyyVuHRrs45_TYjSR6CEyzEGYp5tdwUgc60W-As7cVVrKI3SK1VwHfZg9jo7Icy95uMqsPRQa1-CLKgE4CPtj3GxD8gpMuSpTF-Us9PsDmcCt_OgcooZIjiWnrDfn9oa3oSiJw6d8K2MtU8MNbahyYyd6egnAJtVZHim7QHh5LpkMbKbX9RzX1Hr6tM0YBghCFABCU",
    hasSub: true,
    hasDub: false,
    rating: "4.6",
    genres: ["Horror", "Action"],
  },
  {
    id: "iron-horizon",
    title: "Iron Horizon",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoHvSVKEtPTMLkYWjV4SAMY_VZ-7jjJZPmnVj2Dxz2CNv2gZsiYlVWfrrPvwifRPSa2u725UgjO9-v7wVwzmizlBPoq67S-ETXEXHaUat4tgUPKlNdl1hbiqOaHrekK_iztWMhEV5S6xl-lHCL6fVmMrfzVGs1vb5zEAmEtXZvK2OLCXCY6gRzcVzCqd8svIkCY01jKo3i0bSF5K25rrzmQx2sXofTvTHMgDw8o10GS7PR-ZcDFXOI-x07AVpSocBJ8NiRS3gXGjA",
    hasSub: true,
    hasDub: true,
    rating: "4.2",
    genres: ["Mecha", "Sci-Fi"],
  },
  {
    id: "spirits-of-kyoto",
    title: "Spirits of Kyoto",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiygeYJJrwAnZEV02seBF6AGW4lfiArODp2EWxN9iltNxHVs5QLQDVXID1-l3KPVqR831WWSegxg3730YZoySKEX1TUlL2D-I7GgtJK_zaeSaFAnTR2EZ-qEUZc7UgbtiuLkljlz9GAu5_kAOxzz29BmazwmZSKLuHyVBcHcaregQ1lBzVPaobRgbG9QlKLEvkCUzMu0v6Q2aOohjRxtCB7l_FNMSnDT7nKSDLbLxNE4fuP3UCg7YB3yHnTTZ7d5mKL75dQLITB54",
    hasSub: true,
    hasDub: false,
    rating: "4.8",
    genres: ["Slice of Life", "Romance"],
  },
  {
    id: "court-kings",
    title: "Court Kings",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmO45WyHOWmwP46zMcZgnh8JyVwjJhBnoQ0P-I49fH3JmSSwBSLiyEBw_5d6Cvd2bkcwYp6duuCBgRRbjQhkpQdofkIac5P_0ZjrGghnuf1gRgqvtQrRsYcOeNQj7-xU4QNEiZg-mWER4NnLXITt_G7xnjGYDjJeaHfO6fHKjisAiAL3vQMOs3D66sVRS0mR2f9NAJWlmRSdi6nbzP4759eQNU66EoRACTm2O_lzy_jtAGYt0m8n7q8s4A_zEELm9qeLLxpu8trfM",
    hasSub: true,
    hasDub: false,
    rating: "4.7",
    genres: ["Sports", "Shonen"],
  },
  {
    id: "arcane-academy",
    title: "Arcane Academy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5foXwJAvw_RLJ7ZWub4lGrkdlNQLRBI80p4EurInvG-fRDm_ut9Tuv4JrqOmvc-nlAf7in9_bXuETc3fYKF67ZOE6-CbB3dZs7Tygyjw3e3VPnTsvgRLkDfc55Cr0Ar2woewgY8U3QDq-KrwepuqYmFERJQAptKTglD7h0R9iASKFZ7ya8SdBIQJZkxj-wCL9EnpA-vHtw4gtqOZG_v4FGOV-ABNNkLEbrOjK6RzAwz4lHt6fFsIGhLD3LQVeKgYCJ0WRzrMCTJw",
    hasSub: true,
    hasDub: true,
    rating: "4.5",
    genres: ["Isekai", "Action"],
  },
  {
    id: "shadow-manor",
    title: "Shadow Manor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDivy8YGeora6K03Z4wr2miUJlgFNRt8WK-304gD2sORfUjZSzJ-d4wPluqdMNhPS--M38hPcqrlJaDquCQgrOXdJGzY9uqT2_CHDC0Hz-JxWuSs9ycjWg73vczeP9lq2n02nF6crIE6psyq9vhlFUgv2oYFBGDE6m-9eUuV1YzNfDBe3gZjqMTamqThbN0lkyQtOuXYrJRg5LGOmTbFJrUmrvQPI-HxGNdfg47z-yB03aG-h_m0NQ0tn8qcV_9iHroEV9HBpZ9Wbk",
    hasSub: true,
    hasDub: false,
    rating: "4.3",
    badge: "MATURE",
    badgeColor: "red",
    genres: ["Horror", "Action"],
  },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 py-8 space-y-8">
          {/* Header Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                Discover Anime
              </h1>
              <p className="text-slate-400 text-lg">
                Browse our extensive library by genre to find your next favorite series. 
                From heart-pounding action to heartwarming romance.
              </p>
            </div>
            <div className="min-w-[200px]">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                Sort Results
              </label>
              <div className="relative">
                <select className="w-full appearance-none rounded-xl bg-slate-800 border border-slate-700 text-white py-3 pl-4 pr-10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer">
                  <option>Most Popular</option>
                  <option>Top Rated</option>
                  <option>Newest Added</option>
                  <option>Alphabetical</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          {/* Genre Filters */}
          <CatalogFilters />

          {/* Anime Grid */}
          <CatalogGrid animeList={animeData} />
        </div>
      </main>
      <Footer />
    </div>
  );
}