import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import OngoingAnime from "./components/OngoingAnime";
import LatestUpdates from "./components/LatestUpdates";
import CompletedMasterpieces from "./components/CompletedMasterpieces";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto">
        <HeroBanner />
        <OngoingAnime />
        <LatestUpdates />
        <CompletedMasterpieces />
      </main>
      <Footer />
    </div>
  );
}
