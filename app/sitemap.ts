import { MetadataRoute } from "next";
import { getAnimeUnlimited } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aniku-play.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/AnimeList`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/genre`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  try {
    // Dynamic anime pages
    const unlimitedRes = await getAnimeUnlimited();
    const allAnime = unlimitedRes.data.list.flatMap((group) => group.animeList);

    const animePages = allAnime.map((anime) => ({
      url: `${SITE_URL}/anime/${anime.animeId}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...animePages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
