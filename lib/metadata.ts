import { Metadata } from "next";

const SITE_NAME = "AniKuPlay";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aniku-play.vercel.app";
const SITE_DESCRIPTION = "Watch anime online for free in HD quality. Stream the latest anime episodes, ongoing series, and completed anime with Indonesian subtitles on AniKuPlay.";

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION };

export function generateMetadata({
  title,
  description,
  image,
  path = "",
  keywords,
  noIndex = false,
}: {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const pageDescription = description || SITE_DESCRIPTION;
  const pageUrl = `${SITE_URL}${path}`;
  const pageImage = image || `${SITE_URL}/og-image.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || [
      "anime",
      "watch anime online",
      "anime streaming",
      "free anime",
      "anime subtitle indonesia",
      "nonton anime",
      "anime sub indo",
      "download anime",
      "anime HD",
      "ongoing anime",
      "completed anime",
      "streaming anime sub indo",
      "stream anime sub indo",
      "nonton anime sub indo",
      "download anime sub indo",
      "demon slayer"
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: pageUrl,
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@zaacx",
    },
    verification: {
      google: "your-google-verification-code", // Ganti dengan kode verifikasi Google
    },
  };
}

export function generateAnimeMetadata({
  title,
  synopsis,
  poster,
  genres,
  score,
  episodes,
  status,
  animeId,
}: {
  title: string;
  synopsis: string;
  poster: string;
  genres: string[];
  score?: string;
  episodes?: number;
  status?: string;
  animeId: string;
}): Metadata {
  const description = synopsis.slice(0, 155) + "...";
  const keywords = [
    title,
    `nonton ${title}`,
    `watch ${title}`,
    `${title} sub indo`,
    ...genres,
    "anime",
    "streaming anime",
  ];

  return generateMetadata({
    title: `${title} - Watch Online`,
    description,
    image: poster,
    path: `/anime/${animeId}`,
    keywords,
  });
}

export function generateJsonLd(data: any) {
  return {
    __html: JSON.stringify(data),
  };
}