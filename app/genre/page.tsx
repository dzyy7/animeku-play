import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAnimeUnlimited, getGenres } from "@/lib/api";
import PopularAnimeSection from "@/app/components/PopularAnimeSection";
import GenreSection from "@/app/components/GenreSection";

export default async function CatalogPage() {
  const [unlimitedRes, genresRes] = await Promise.all([
    getAnimeUnlimited(),
    getGenres(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-10 py-8 space-y-12">
          {/* Header Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-8">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                Discover Anime
              </h1>
              <p className="text-slate-400 text-lg">
                Browse our extensive library, check out top rated series, or dive into specific genres.
              </p>
            </div>
          </section>

          {/* Popular Section */}
          <PopularAnimeSection initialUnlimitedList={unlimitedRes.data.list} />
          
          <div className="w-full h-px bg-gray-800" />
          
          {/* Genre Section */}
          <GenreSection genres={genresRes.data.genreList} />

        </div>
      </main>
      <Footer />
    </div>
  );
}
