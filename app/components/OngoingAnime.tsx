import AnimeCard from "./AnimeCard";

const ongoingAnimeData = [
  {
    id: "jujutsu-kaisen",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3vDF-PXBPabbdZ3FeJM-xzUzcRCXpbUjcSO42I53osW6q_RtFlgMpsMljkLYuL4ZXeK-M0l8q0MVNG5F2BxrkECZy2mns0YT1vjM20QgJ4rHfE0fPFYd1WXLRGReMuUCNMx3KAZWXFLjoowu62bUtmj8hndmbrj_ywZ90SFxlzZrP_SDPbhfugHYsjsMTZ7uZSjkRb8W44yz7BD-oiPvZy2F8c35KyO6Qu3EWfHz1sTH2Pe-z6P0oeAUNbnAKMUsH9a4dVRYeljI",
    title: "Jujutsu Kaisen",
    subtitle: "Season 2",
    episode: "Ep 23",
  },
  {
    id: "demon-slayer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEi0wCiStjh6IHncMGbXc4QHQNtiY2M7xFW10hztN_npywUyH5PSZPSophTTZqrvI2oQZrOPxYDCPQBG9_8kEyyfiAf2DSS9mPu_EbtOcOka2ZlbK8BgCssN-CFEVOtPufW48k8mnOTq3NbScknbZNLZB830wJ9jc6DQ-D1mgH76kdbN1OwrdY4Zub5vKBUZCFJVmATCucfM4_Oo9oxDtX8fLf5t81uUaD-iuRvngerM1dJY6YgwZZeCSKE37Sahx5tggTADKlPxw",
    title: "Demon Slayer",
    subtitle: "Swordsmith Village Arc",
    episode: "Ep 10",
  },
  {
    id: "one-piece",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDif4EzpIFr5rTxkjt2Nk2EePh-DFTP8UzreXIIXyWZTiW5HDr5jBX6tMrqtvUPHZXgLq9flmyClGjh01BOh18NiYX858_Oss2DG3hXNwV5-taP-dovQE5xZT3wc5KgpfJ5Upy2E_FD485bQWm3lzAV_2-C1H0rmfDj5AM9cCmmw6NBevSb9-xYj6IZsfRY2hzWb3V3yXfkT9nos9DbwsSi8ziDXh5a7tifu-4KUIaUuPPaK6_3UUTqp1ZrM3ewIxoVbXG7ZZw93xI",
    title: "One Piece",
    subtitle: "Wano Arc",
    episode: "Ep 1050",
  },
  {
    id: "spy-x-family",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtZiOVDln9fWyXxoAbyUQpdzfC0ZuUo0iNcRoyKE8NxSDfmz_SL7I6g_a2wS2Z5McmTmYCG_CYElAUqs6OkDmg3jwetTNLoMdw3Gy3IxP1X5Hc1-l0nc4-cxKS2ROnf_AOc0bQlI06O6NGkOmlLbvM4PcaTZJmrlK5aVRMw54yFBr7LqQoJP2cMaLF9amnKcJe4q7MVN0rmSZ4ura8xI3quL_aWJojXLaSuTaKLrn_X_EsImHrm4J06odyUzJOuauQw7bV0qy0U44",
    title: "Spy x Family",
    subtitle: "Season 1 Part 2",
    episode: "Ep 25",
  },
  {
    id: "chainsaw-man",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKscvtZL2vdSgK5ahrDuwAGEtuRW9SoGcKUJImPNlPzFDfEC58VwwF0dU154k8HAnUQXhgwHCtI5ZzanJyygDPGhVEjQ9XO7YGRP0q8l3TZ-E-ql7P3vW7cFChkThOy7Hdsl8pdi3ImJL7V__8yCXGqjKeajMEBWPUiwNuywHyA3uH9lH6IRRwEvqsf8PNuktSPTCtVuwX_8wr4LPT2FmBriH36DmgGPu688wHd9mBG4_gdAGqb5-vF5L_ad7JiBvcK--BVjWAZdA",
    title: "Chainsaw Man",
    subtitle: "Public Safety Arc",
    episode: "Ep 12",
  },
];

export default function OngoingAnime() {
  return (
    <section className="py-6 px-4 md:px-8 lg:px-12 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Ongoing Anime
        </h2>
        <div className="flex gap-2">
          <button className="size-8 rounded-full bg-surface-dark hover:bg-white/10 flex items-center justify-center text-white transition-colors">
            <span className="material-symbols-outlined text-sm">
              arrow_back_ios_new
            </span>
          </button>
          <button className="size-8 rounded-full bg-surface-dark hover:bg-white/10 flex items-center justify-center text-white transition-colors">
            <span className="material-symbols-outlined text-sm">
              arrow_forward_ios
            </span>
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
        {ongoingAnimeData.map((anime, index) => (
          <AnimeCard
            key={index}
            id={anime.id}
            image={anime.image}
            title={anime.title}
            subtitle={anime.subtitle}
            episode={anime.episode}
            variant="card"
          />
        ))}
      </div>
    </section>
  );
}
