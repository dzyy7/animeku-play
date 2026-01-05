import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DownloadSection from "@/app/components/DownloadSection";
import RecommendedAnimeSection from "@/app/components/RecommendedAnime";
import VideoSection from "@/app/components/VideoSection";
import { getEpisodeDetail, getCompletedAnime } from "@/lib/api";

interface PageProps {
  params: Promise<{ animeId: string; episode: string }>;
}

export default async function WatchEpisodePage({ params }: PageProps) {
  const { episode } = await params;
  
  // Fetch data
  const [episodeDetailData, recommendedData] = await Promise.all([
    getEpisodeDetail(episode),
    getCompletedAnime(1) // Fetch random page or just first page for random selection
  ]);

  if (!episodeDetailData || !episodeDetailData.data) {
      notFound();
  }

  const episodeData = episodeDetailData.data;
  
  // Randomly select 7 anime for recommendation
  const shuffledRecommended = [...recommendedData.data.animeList]
    .sort(() => 0.5 - Math.random())
    .slice(0, 7);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 lg:px-10 py-6 lg:py-8 flex flex-col gap-8">
        {/* Episode Info */}
        <section className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {episodeData.info.genreList.map((g) => g.title).join(" • ")}
            </div>
            <h1 className="text-slate-900 dark:text-white tracking-tight text-2xl lg:text-3xl font-bold leading-tight">
              {episodeData.title}
            </h1>
            <p className="text-slate-400 text-sm">
              {episodeData.releaseTime}
            </p>
          </div>

          {/* Video Player & Server Selection */}
          <VideoSection episodeData={episodeData} />

          {/* Download Section */}
          <DownloadSection downloadData={episodeData.downloadUrl} />
        </section>

        {/* Recommended Anime */}
        <RecommendedAnimeSection animeList={shuffledRecommended} />
      </main>
      <Footer />
    </div>
  );
}

