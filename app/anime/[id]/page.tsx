import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/app/components/Breadcrumb";
import AnimeDetailHero from "@/app/components/AnimeDetailHero";
import EpisodeList from "@/app/components/EpisodeList";
import ReleaseSchedule from "@/app/components/ReleaseSchedule";

// Sample data - in real app this would come from API
const animeData = {
  id: "attack-on-titan-final",
  title: "Attack on Titan:",
  titleHighlight: "The Final Season",
  poster:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAug-GLo1efeY9hWmfIQG8RQrIbhc1zWAzYkp6iAac3pWTNmvukp-AApukU6Xf9Yx8QMGliLybg-BsNUKVyNP5sLIrta8uYxZcSv8GU9OiIL-Es3YxNjKaVE4qzzL4SvpvpekAjuAe7jOkHZkAX5yg7EOZxO7hicaRX2fMNoB-xP45b6Zmf3RmaiHh4PLPUBrEOkP3T_gyxTWBHR1D0UqIacXYfdAVKcOY8-zSdW8wfGw0Lbwi0BLIQqNehN7eF1Utj4_wa482Azp8",
  author: "Hajime Isayama",
  studio: "MAPPA Studio",
  year: "2023",
  rating: "4.9",
  votes: "12,450",
  genres: ["Action", "Dark Fantasy", "Drama", "Post-Apocalyptic"],
  description:
    "Gabi Braun and Falco Grice have been training their entire lives to inherit one of the seven Titans under Marley's control and aid their nation in eradicating the Eldians on Paradis. However, just as all seems well for the two cadets, their peace is suddenly shaken by the arrival of Eren Yeager and the remaining members of the Survey Corps.",
  status: "Airing Now",
  ageRating: "TV-MA",
};

const episodesData = [
  {
    number: 1,
    title: "The Other Side of the Sea",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBym-xkxgKhKO1whzQmYruKYkC-II-xFW8NX1aeTBFP6srFS87x09W2tYBNxHqtJ4z8cIUs3o4eXKGff2YdeoNjNRr0H9HASGSCI5BGis2HdHtlo0Do4zGHcfin_bAof9NhoN1OlgPiT5RQez9C_Ua_i50jNBilPiMNI0-y7k_jKpJ8vWpJVLalt8EWD4GUqMxv8KCWKK7J74AsYG2yq9q85p5ENZEDHJ6D5ziPQL-ZTKDYEjeVlKv1A5dSEvj9BHxPTJyOWa06Z6g",
    date: "Dec 7, 2020",
    duration: "23m 50s",
    hasSub: true,
    hasDub: true,
    quality: "1080p",
    isCurrentlyPlaying: true,
  },
  {
    number: 2,
    title: "Midnight Train",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAV948nOzjYxVSTFzMD4qG3gEZ_kH01cM3F9gmPv6MwHWQZi-kJ7zp9cfme4Q_kZbApoYGtZHntQuYweg1EL7wPYJPaAls1oHQ0cDLCpF9dXl1pnQQtYfAT_T74NCf85QRToOlSQKJ1aFVDJ3Uc-ihH8XyugQay6jN6bWkQJ6bvLryUt8TtaIjtqKEDI9NI0us-uKGfZoZ5Fw0nit8i-t3-UnIvq1jVbx7W-otD9SP6Ap7O85Mi3mQ4aAbUtK3ShtT9ElBZOQCJihY",
    date: "Dec 14, 2020",
    duration: "24m 10s",
    hasSub: true,
    hasDub: true,
    quality: undefined,
    isCurrentlyPlaying: false,
  },
  {
    number: 3,
    title: "The Door of Hope",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtR5_nNC-TxU5O9Qrmes_Myx8IqwjWK3EkRp8BxOV9QFKPdTQOLpue-wh-CAqsPU476S_I-wRcWQak5k1IppN5j0vODj2Ivr6lVinQ8h7AHHPNFhsLzS7MuM7BRnJUUoFvgSdwiuLZHr5OY_VE9b7LD5EdKb8gLoN3kqe17w-tgZOaX-Q340NxEqVSONQN_79dJJc_2tmji38nScgdApIHyjuYQVopDR0UnXe2TKgZu6AinGgjf8m7eyMU1RnizSb7nUhp-l6BR-Y",
    date: "Dec 21, 2020",
    duration: "23m 55s",
    hasSub: true,
    hasDub: true,
    quality: undefined,
    isCurrentlyPlaying: false,
  },
];

const scheduleData = [
  {
    time: "14:00",
    timezone: "JST",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmT646ssKYTpVzwuRmz5y6wnhoXpJUT29M7WOzyaGB8jDUbHyNpD1C2MzV6uonSV8uzCRR2t0qC2FEDu0HCFAxi4TC5rkGySGqYypiMtkG0Jwdq7glhOLJYd6OSNj2p6n-O4kVsdbBobjHlVVHz_4YnuKwcyVkpfj6A39aCSNB0yPMhNpa5YdeZFMpugmak3o-woyD2LsKEDDb-tat68DIEStiK2WSwev8fD4Ie6wBfeYayL-Y2jy1YYUNJdQmVv2_lSa-3B2CE0E",
    title: "Bleach: Thousand-Year Blood War",
    episode: "Episode 24",
  },
  {
    time: "16:30",
    timezone: "JST",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuCtYrdG7VBGiXm8pHRc4L3gPMJc8o88cbIccgQWn4HGvdSjoY1432GiPM5Foqr7QELe5YgJdp7ZUOlvqyaxm0s8mCQmfg510Dk1EsjC4F2aj5OOdDgGgFP5CSxSXelDEYJgoGO942iSZNeqEBYS0EsHPdfjVZUNmZxRtfHGk9xBgSDyqMP5y_nSyNb8RY7TjnCWTlkbCbjkazq7AOgKs7SFpmDRLGrPzfzz_PaFEJXUgH8ITlvT0suZF8Oh49XPKy3Gc_uEJEg-0",
    title: "Spy x Family",
    episode: "Episode 18",
  },
  {
    time: "19:00",
    timezone: "JST",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9v8b4P2PI0QRgQxsh-6B8JD0EzaP2sJGqvdwOhy-VK8YucLbi0zSPr02z1YAgYIP99qJAPqdnwK7mCOmcA39OJh4zIebwAlAi8WnLKsCORfaE18v1PASNXC3ueEVb1_AohnSzjQBMwXVh4sI__jGdhbwKSF22T0e06LTUWjH5wvUCIzzQBef-fRLu3ZZNBMJmjB4PqTbrKrgWaRNrwrKnCC1QOZ3wd7F71wFRnrCm7yuT6kP8P6m8DtvwzrnY4P8CxJ3SjfVASx8",
    title: "Jujutsu Kaisen",
    episode: "Episode 12",
  },
  {
    time: "22:00",
    timezone: "JST",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYs1BiqgRkm-5FSaPq02RejVK-XrTxEtnvoBjVmiEXhFdAl7u-2AiD6ZzNbvrTKuwy8B3_DtHWzP0_e2Tc_0rnu642AlV9EnVt2xKonpHOxqRteuFk4inKJdZBBl2sA1umHZvdxMdxOV0w0uur_u9baHO3K9_jGhBKg6ERHXdyqujbqUuVdqG9FAeSBM-MWIhTMXq-PVe53Bt6OOVcJrOaxqCu_iX2GziMUEko6yvEJTGJjqGZl8e69ZILn0lIc-sKatAcwCI5mwE",
    title: "Chainsaw Man",
    episode: "Episode 10",
    isAired: true,
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // In real app, fetch anime data based on id
  console.log("Anime ID:", id);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-grow flex justify-center w-full">
        <div className="w-full max-w-[1280px] px-4 md:px-10 py-6 md:py-8 flex flex-col gap-8">
          {/* Breadcrumb */}
          <Breadcrumb
            animeTitle={`${animeData.title} ${animeData.titleHighlight || ""}`}
          />

          {/* Hero Section */}
          <AnimeDetailHero anime={animeData} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 mt-6">
            {/* Episode List */}

            {/* Release Schedule Sidebar */}
            <div className="flex flex-col gap-6">
              <ReleaseSchedule scheduleItems={scheduleData} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
