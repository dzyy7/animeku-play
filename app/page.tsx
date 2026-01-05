import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import OngoingAnime from "./components/OngoingAnime";
import LatestUpdates from "./components/LatestUpdates";
import CompletedMasterpieces from "./components/CompletedMasterpieces";
import Footer from "./components/Footer";
import { getAnimeDetail, getCompletedAnime, getOngoingAnime } from "@/lib/api";

export default async function Home() {
  // Fetch data in parallel where possible
  const [latestPage, randomOngoingPage, completedPage] = await Promise.all([
    getOngoingAnime(1),
    getOngoingAnime(Math.floor(Math.random() * 5) + 1), // Random page 1-5
    getCompletedAnime(1),
  ]);

  // Process Hero Data: Pick 4 random from latest page and fetch details
  const allLatest = latestPage.data.animeList;
  const shuffledLatest = [...allLatest].sort(() => 0.5 - Math.random());
  const heroCandidates = shuffledLatest.slice(0, 4);
  
  const heroDetailsPromises = heroCandidates.map(async (anime) => {
  const detail = await getAnimeDetail(anime.animeId);
  if (!detail) return null;

  return {
    ...detail,
    animeId: anime.animeId,
  };
});

const heroAnimeList = (await Promise.all(heroDetailsPromises))
  .filter((item): item is NonNullable<typeof item> => item !== null);

  // Process Latest Updates: Top 3 from page 1
  const latestUpdatesList = allLatest.slice(0, 3);

  // Process Completed: Just pass the list
  const completedList = completedPage.data.animeList;

  // Process Ongoing Section: Use the data from the random page
  const ongoingList = randomOngoingPage.data.animeList;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto">
        <HeroBanner heroAnime={heroAnimeList} />
        <OngoingAnime animeList={ongoingList} />
        <LatestUpdates animeList={latestUpdatesList} />
        <CompletedMasterpieces animeList={completedList} />
      </main>
      <Footer />
    </div>
  );
}
