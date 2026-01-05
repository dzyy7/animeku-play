
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AnimeListGrid from "@/app/components/AnimeListGrid";
import { searchAnime } from "@/lib/api";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const keyword = q || "";

  let animeList: any[] = [];
  
  if (keyword) {
    try {
      const response = await searchAnime(keyword);
      if (response && response.data && response.data.animeList) {
        animeList = response.data.animeList.map((item) => ({
          id: item.animeId,
          title: item.title,
          image: item.poster,
          episodes: item.episodes ? `${item.episodes} Eps` : "Unknown",
          status: item.status || "Unknown",
          badge: item.score ? `★ ${item.score}` : undefined,
          badgeColor: "primary",
        }));
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
       <div className="flex-1 flex justify-center w-full px-4 py-8 lg:px-20 xl:px-40">
        <div className="flex flex-col w-full max-w-[1200px] gap-8">
           {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-3xl lg:text-4xl font-black leading-tight">
              Search Results
            </h1>
            <p className="text-text-secondary text-lg font-normal">
              Showing results for <span className="text-primary font-bold">"{keyword}"</span>
            </p>
          </div>

          {/* Results Grid */}
          {animeList.length > 0 ? (
            <AnimeListGrid animeList={animeList} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-surface-dark mb-4">search_off</span>
              <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
              <p className="text-text-secondary">Try searching for a different keyword</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
