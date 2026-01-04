import Link from "next/link";
import AnimeCard from "./AnimeCard";

const completedAnimeData = [
  {
    id: "fullmetal-alchemist-brotherhood",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1A53kJdU9GmuFy48H6yocRMALBrFru-K-28T4OU4HNR-EvylAWsdx0x6L-7gIb9GJ4_W6viGAIHulGHFeeLUjFjtQVIh05FBr9VkBsn_cVVt38sVoUW4JDSTm4pWw5Oh8MOJ-kHck2hddbTP3MTXQJLLl9kR_w8-mGhgyy8JTj_Khj60uix7lzWj3FNLk1S2STZ-APRLdjRtukvvGgHRcu3yZqVkx04q2U5IidPP5kjQMcx60PQZZBM1LkzqFv9r3cKRsZZemEEQ",
    title: "Fullmetal Alchemist: Brotherhood",
    episodeCount: "64 Eps",
    rating: "9.1",
    showHdBadge: true,
  },
  {
    id: "death-note",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPdyvGSJaEEzXGibpr4AnlNzqErftavEp80AV1Dx6ElutIc15y76qc3mXtWKdrE47jEcjlbY2rBDurQr0eZOIgwvHIHl2jktnFXSdplAfxU079vF50XyHzmHa6nNG7ukXm98bpWdivENjAe7cVKmkEcNO1tHV5rlUbXlpcGOTUFjZW5UUeiIId5NEqYRnVsjpmpQmhU6WQvK4vqBZIkUBNbj-FHbJN7RYM26CrQkloVxGqRgPi6cbc5Rkyut33xVd03rjLMPCt6uo",
    title: "Death Note",
    episodeCount: "37 Eps",
    rating: "9.0",
    showHdBadge: true,
  },
  {
    id: "steins-gate",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfYtREO1FbC86NlmHztGg9cR8hTehODuNWdsvNYVqSWp_TmjiNOCihgzFzx2MPq2yBH3uQ8Z0Golp4W4i_qdO10AAQPXlRUxaGWraGn47J2Kw4ViFaYIilTEZMJ-E-jiWnX-wR0merwhLFeIwtJ1U1N9s9GoXpp7XXlksa8wskaZEXRXL1YCUR1fBrNFj9kK0r8bcuqqWGK6yZIZFUKO0c3EfdP8-xHhzzwA5oRgLgucih5ss3WhjtOef8RR9Bsn61T_Ry4jt0XBo",
    title: "Steins;Gate",
    episodeCount: "24 Eps",
    rating: "9.1",
    showHdBadge: false,
  },
  {
    id: "hunter-x-hunter",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmjvegvYRdpoS8pYT6INk433n-5wPmkC5roLgElO9EfsVUesdN82BiHlEaFViJEDDHN7yKyPbD4o_RRO9TEqPe73oq0XWMdycyQ-zEe2hp6Yl0KDAue0zmpMWg3-LXsKNqb60v0ym56jO8hSFBh8k7vxAvaucX8jkcvGtWxfKyb9bB8fUbxvZpPjHwLusUKR48DS2vI40m3UfqKrWuzyHKIi27BwYL8nFTUZ4xgK2sI3ikKymQD966-6q2VAx9PMocQNv3zk2KuXg",
    title: "Hunter x Hunter",
    episodeCount: "148 Eps",
    rating: "9.0",
    showHdBadge: false,
  },
  {
    id: "cowboy-bebop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgk2Shil6jT9NUWH1e-Lr9nN7edbiK_6GDtt4gaEjYwnce7quIFVZe1idyqBsWp_9bxtMbKSqv5s6XKqUfDQbjPEOw0S7VnFRoNt3OtW4HaH5-uj_92ia_mPdXG6w48PCQsx1e6gNXQaAEjw8tbOzAHc16__vBm_CLcgpHUrlZ3a3l5xcuwMhYks2KV2WACRPVTi4xVDhT7fSyfW-OGSv9TqfFfBVpvFasoICDsgoFaq74ZKOdjHWbYFIz1s6UtKg24XGBl692CrU",
    title: "Cowboy Bebop",
    episodeCount: "26 Eps",
    rating: "8.9",
    showHdBadge: false,
  },
  {
    id: "code-geass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNmHgVmg2-ZB6VKY4ME807wzxCTHgZPty5qulcXkENmHCKn7OsoY5TksgNtVEqlKmO5nTHrMCFdvw3DFB8GqQH6D4T7q_oWbgLhG_6MKa22XQETk_WowWR91ezEPSg55e7PpksVZJRYqSlEV9OVzZvMsYXCXXB-ZT5dXRMxhOY5X-sxdLy8IVcmBrN7sRDdibrwVLvyDlzoixRtcRJ1FgY1u9WrOp_FjqjoWjaFSRaOuMVPWc4mJN6wvLzImQGJJi9Qo-6YnmEBoo",
    title: "Code Geass",
    episodeCount: "50 Eps",
    rating: "8.7",
    showHdBadge: false,
  },
];

export default function CompletedMasterpieces() {
  return (
    <section className="py-6 px-4 md:px-8 lg:px-12 pb-20 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Completed Masterpieces
        </h2>
        <Link
          className="text-sm text-primary font-medium hover:text-white transition-colors"
          href="#"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
        {completedAnimeData.map((anime, index) => (
          <AnimeCard
            key={index}
            id={anime.id}
            image={anime.image}
            title={anime.title}
            episodeCount={anime.episodeCount}
            rating={anime.rating}
            showHdBadge={anime.showHdBadge}
            variant="poster"
          />
        ))}
      </div>
    </section>
  );
}
