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

  const [anime, scheduleRes] = await Promise.all([
    getAnimeDetail(id), // ← SUDAH AnimeDetail
    getSchedule(),
  ]);

  let batchData = null;
  if (anime.batch?.batchId) {
    try {
      batchData = await getBatch(anime.batch.batchId);
    } catch (e) {
      console.error("Failed to fetch batch:", e);
    }
  }

  const heroData = {
    id: anime.title,
    title: anime.title,
    titleHighlight: "",
    poster: anime.poster,
    author: anime.producers,
    studio: anime.studios,
    year: anime.aired,
    rating: anime.score,
    votes: "N/A",
    genres: anime.genreList.map((g) => g.title),
    description: anime.synopsis.paragraphs.join("\n\n"),
    status: anime.status,
    ageRating: anime.type,
    batchData,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-grow flex justify-center w-full">
        <div className="w-full max-w-[1280px] px-4 md:px-10 py-6 md:py-8 flex flex-col gap-8">
          <Breadcrumb animeTitle={anime.title} />
          <AnimeDetailHero anime={heroData} />

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 mt-6">
            <EpisodeList
              animeId={id}
              episodes={anime.episodeList}
              recommended={anime.recommendedAnimeList}
            />
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
