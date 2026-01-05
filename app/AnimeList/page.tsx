import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ClientAnimeCatalog from "@/app/components/ClientAnimeCatalog";
import { AnimeUnlimitedGroup, getAnimeUnlimited } from "@/lib/api";

export default async function AnimeListPage() {
  let initialData: AnimeUnlimitedGroup[] = [];
  try {
    const response = await getAnimeUnlimited();
    if (response && response.data && response.data.list) {
      initialData = response.data.list;
    }
  } catch (error) {
    console.error("Failed to fetch anime list:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <div className="flex-1 flex justify-center w-full px-4 py-8 lg:px-20 xl:px-40">
        <div className="flex flex-col w-full max-w-[1200px] gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
              Browse Anime
            </h1>
            <p className="text-text-secondary text-lg font-normal">
              Discover your next favorite series from our extensive library.
            </p>
          </div>

          <ClientAnimeCatalog initialData={initialData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}