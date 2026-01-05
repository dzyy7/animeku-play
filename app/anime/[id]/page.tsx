import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/app/components/Breadcrumb";
import AnimeDetailHero from "@/app/components/AnimeDetailHero";
import EpisodeList from "@/app/components/EpisodeList";
import ReleaseSchedule from "@/app/components/ReleaseSchedule";
import { getAnimeDetail, getBatch, getSchedule } from "@/lib/api";
import { Metadata } from "next";
import { generateAnimeMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const anime = await getAnimeDetail(id);
    
    return generateAnimeMetadata({
      title: anime.title,
      synopsis: anime.synopsis.paragraphs.join(" "),
      poster: anime.poster,
      genres: anime.genreList.map((g) => g.title),
      score: anime.score,
      episodes: anime.episodes,
      status: anime.status,
      animeId: id,
    });
  } catch (error) {
    return {
      title: "Anime Not Found",
      description: "The requested anime could not be found.",
    };
  }
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [anime, scheduleRes] = await Promise.all([
    getAnimeDetail(id),
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

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: anime.title,
    description: anime.synopsis.paragraphs.join(" "),
    image: anime.poster,
    genre: anime.genreList.map((g) => g.title),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: anime.score,
      bestRating: "10",
    },
    numberOfEpisodes: anime.episodes,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}