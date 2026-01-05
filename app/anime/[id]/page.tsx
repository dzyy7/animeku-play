import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/app/components/Breadcrumb";
import AnimeDetailHero from "@/app/components/AnimeDetailHero";
import EpisodeList from "@/app/components/EpisodeList";
import ReleaseSchedule from "@/app/components/ReleaseSchedule";
import { getAnimeDetail, getBatch, getSchedule } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Fetch Anime Details and Schedule in parallel
  const [detailRes, scheduleRes] = await Promise.all([
    getAnimeDetail(id),
    getSchedule(),
  ]);

  if (!detailRes || !detailRes.data) {
    notFound();
  }

  const anime = detailRes.data;

  // 2. If batch exists in detail, fetch batch details (for download links)
  // The API structure suggests 'batch' object in detail response has 'batchId'. 
  // User wants to use /anime/batch/{id} API for download links.
  let batchData = null;
  if (anime.batch?.batchId) {
      try {
        const batchRes = await getBatch(anime.batch.batchId);
        batchData = batchRes;
      } catch (e) {
          console.error("Failed to fetch batch:", e);
      }
  }

  // Map detail data to Hero props
  const heroData = {
    id: anime.title, // using title or id? interface says id.
    title: anime.title,
    titleHighlight: "", // API doesn't separate highlight
    poster: anime.poster,
    author: anime.producers, // Using producers as author proxy or just producers
    studio: anime.studios,
    year: anime.aired,
    rating: anime.score,
    votes: "N/A", // API doesn't provide votes
    genres: anime.genreList.map((g) => g.title),
    description: anime.synopsis.paragraphs.join("\n\n"),
    status: anime.status,
    ageRating: anime.type, // Using type as proxy or just show type
    batchData: batchData, // Pass full batch response to Hero for the modal/links
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-grow flex justify-center w-full">
        <div className="w-full max-w-[1280px] px-4 md:px-10 py-6 md:py-8 flex flex-col gap-8">
          {/* Breadcrumb */}
          <Breadcrumb animeTitle={anime.title} />

          {/* Hero Section */}
          <AnimeDetailHero anime={heroData} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 mt-6">
            {/* Episode List */}
            <EpisodeList 
                animeId={id} 
                episodes={anime.episodeList} 
                recommended={anime.recommendedAnimeList}
            />

            {/* Release Schedule Sidebar */}
            <div className="flex flex-col gap-6">
              <ReleaseSchedule scheduleData={scheduleRes.data} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
