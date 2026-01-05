
export const API_BASE_URL = "https://www.sankavollerei.com";

interface Pagination {
  currentPage: number;
  hasPrevPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number | null;
  totalPages: number;
}

export interface AnimeItem {
  title: string;
  poster: string;
  episodes?: number;
  releaseDay?: string;
  latestReleaseDate?: string;
  lastReleaseDate?: string; // Sometimes used in completed
  animeId: string;
  href: string;
  otakudesuUrl: string;
  score?: string; // Sometimes present in list
  status?: string;
}

export interface AnimeListResponse {
  status: string;
  statusCode: number;
  data: {
    animeList: AnimeItem[];
    pagination: Pagination;
  };
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

export interface Episode {
  title: string;
  eps: number;
  date: string;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
}


export interface Batch {
  title: string;
  batchId: string;
  href: string;
  otakudesuUrl: string;
}

export interface DownloadUrl {
  formats: {
    title: string;
    qualities: {
      title: string;
      size: string;
      urls: {
        title: string;
        url: string;
      }[];
    }[];
  }[];
}

export interface BatchResponse {
  status: string;
  data: {
    downloadUrl: DownloadUrl;
  };
}

export interface ScheduleAnime {
  title: string;
  slug: string;
  url: string;
  poster: string;
}

export interface ScheduleDay {
  day: string;
  anime_list: ScheduleAnime[];
}

export interface ScheduleResponse {
  status: string;
  data: ScheduleDay[];
}

export interface AnimeDetail {
  title: string;
  poster: string;
  japanese: string;
  score: string;
  producers: string;
  type: string;
  status: string;
  episodes: number;
  duration: string;
  aired: string;
  studios: string;
  batch?: Batch; // Added batch
  synopsis: {
    paragraphs: string[];
    connections: any[];
  };
  genreList: Genre[];
  episodeList: Episode[];
  recommendedAnimeList: AnimeItem[];
}

export interface AnimeDetailResponse {
  status: string;
  statusCode: number;
  data: AnimeDetail | null;
}

export async function getOngoingAnime(page: number = 1): Promise<AnimeListResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/ongoing-anime?page=${page}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) {
    throw new Error("Failed to fetch ongoing anime");
  }
  return res.json();
}

export async function getAnimeDetail(id: string): Promise<AnimeDetailResponse | null> {
  const res = await fetch(`${API_BASE_URL}/anime/anime/${id}`, {
    next: { revalidate: 86400 }, // Revalidate daily
  });
  
  if (res.status === 404) {
      return null;
  }

  const data = await res.json();
  
  if (data.statusCode === 404) {
      return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch anime detail for ${id}`);
  }
  return data;
}

export async function getBatch(batchId: string): Promise<BatchResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/batch/${batchId}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch batch for ${batchId}`);
  }
  return res.json();
}

export async function getSchedule(): Promise<ScheduleResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/schedule`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  return res.json();
}

export async function getCompletedAnime(page: number = 1): Promise<AnimeListResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/complete-anime?page=${page}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch completed anime");
  }
  return res.json();
}

export interface ServerQuality {
  title: string;
  serverList: {
    title: string;
    serverId: string;
    href: string;
  }[];
}

export interface EpisodeDetailResponse {
  status: string;
  statusCode: number;
  data: {
    title: string;
    animeId: string;
    releaseTime: string;
    defaultStreamingUrl: string;
    hasPrevEpisode: boolean;
    prevEpisode: {
      title: string;
      episodeId: string;
      href: string;
      otakudesuUrl: string;
    } | null;
    hasNextEpisode: boolean;
    nextEpisode: {
      title: string;
      episodeId: string;
      href: string;
      otakudesuUrl: string;
    } | null;
    server: {
      qualities: ServerQuality[];
    };
    downloadUrl: {
      qualities: {
        title: string;
        size: string;
        urls: {
          title: string;
          url: string;
        }[];
      }[];
    };
    info: {
      credit: string;
      encoder: string;
      duration: string;
      type: string;
      genreList: Genre[];
      episodeList: Episode[];
    };
  };
}

export interface ServerStreamResponse {
  status: string;
  statusCode: number;
  data: {
    url: string;
  };
}

export async function getEpisodeDetail(href: string): Promise<EpisodeDetailResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/episode/${href}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch episode detail for ${href}`);
  }
  return res.json();
}

export async function getServerStream(href: string): Promise<ServerStreamResponse> {
  const res = await fetch(`${API_BASE_URL}${href}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch server stream for ${href}`);
  }
  return res.json();
}

export async function searchAnime(keyword: string): Promise<AnimeListResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/search/${keyword}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    // Search might return 404 if not found? Or just empty list. 
    // Assuming standard error handling for now.
    throw new Error(`Failed to search anime for ${keyword}`);
  }
  return res.json();
}
export interface AnimeUnlimitedItem {
  title: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

export interface AnimeUnlimitedGroup {
  startWith: string;
  animeList: AnimeUnlimitedItem[];
}

export interface AnimeUnlimitedResponse {
  status: string;
  statusCode: number;
  data: {
    list: AnimeUnlimitedGroup[];
  };
}

export async function getAnimeUnlimited(): Promise<AnimeUnlimitedResponse> {
  const res = await fetch(`${API_BASE_URL}/anime/unlimited`, {
    next: { revalidate: 86400 }, // Revalidate
  });
  if (!res.ok) {
    throw new Error("Failed to fetch anime unlimited list");
  }
  return res.json();
}
