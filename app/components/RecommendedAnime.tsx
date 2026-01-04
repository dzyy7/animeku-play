import Link from "next/link";

interface RecommendedAnime {
  id: string;
  title: string;
  genre: string;
  episode: string;
  rating: string;
  poster: string;
}

interface RecommendedAnimeProps {
  animeList: RecommendedAnime[];
}

const defaultAnimeList: RecommendedAnime[] = [
  {
    id: "cyberpunk-edgerunners",
    title: "Cyberpunk: Edgerunners",
    genre: "Sci-Fi, Action",
    episode: "EP 12",
    rating: "9.2",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxXbdQngoVU7pDWqxCI1VI6hF9iWzNeQ18YWjb-CCsokT5VIyTPTUqOwovgKqHDf7d0k_G_IRn4CkEyPgfv8drFfWqWVT2OaPWpkHEI6Yb0T8GZt0Bsg_bDYf39suAr6sXmujGjZ7Buk4QAvslwnCL7ozl4E-w2iJ2fC6r8P3Io1W__P9AIsd1MxdOENEvMRAZbB1JMJ4g_at6Zpy8H8aCFIZnlVd-VEKIR3RLbfnNRzIchf1TjUYBEqXArRKUwVph31aBaZLOoEU",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    genre: "Action, Fantasy",
    episode: "EP 24",
    rating: "8.9",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTLnjw2FeCgK-IjValjONiqvSd-ZBHWtp9U6g1ZN8KW2wwcCw7Bc_UpxrpASGiuG47ReBAF8tgt1gK_ReVU2UKyZBRnKmT1uOHo0KBawnmQcmQsrr2VtL_CplkEN2p_aXUgjSAtmWuIrglCiLcRELuNpuSXxs8oFYRTqwevmL8-yuTBTAwIWBVWF_LIT-heD4d-h8AZ3HCej15-xyB8J4hj6u7fxS0G-kwc5w4cMQIQMyIvroaDziTdyzl02HxiKKyemq65VYiQio",
  },
  {
    id: "one-piece",
    title: "One Piece",
    genre: "Adventure, Comedy",
    episode: "EP 1015",
    rating: "9.5",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1GQOKPThVk-2ojXDX4Szu6HUEcEP_ALl66v5TttR94pHuWvNIxF2iNU3JYUvq36t5kfywxgEQSj-HrpVglOapc9KedDcF5d4TI5IWPXZ0dVCDMd1olW8-iw9ERnZacF1nGzUVp_LC1GK-Egzf8WzH7fEAUTQ-3PwqSSbVG7lFviN5aSpTEbHcw0ezhLPLq1le0AJjY-5yIe7WKCxe2OCOEDtm7LDiP5JB_PjRYAB2cgBgL8c_1YKyQ2CGNT7ZUo1KQZZcXEjOpXU",
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    genre: "Slice of Life, Action",
    episode: "EP 12",
    rating: "8.7",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCg4ZQ0riRdls9llS59N2dpz_c1t6sO-9JFmYS6ze6IzKj5qp1CyBRJfJlRtCmMoyjZap8pRbvHKzYqUn2_QV5ZCbunTBhzkxeEFsoSH1bfzGQOXCAN3Rhn2mehbQJcKbI1niYzZRtlYpj3PDgW24bgPhe_MpbVaRA9QuY_iJHG1K37nm8HZapAx4FmfpRfV-XtWbES2uh856cQ8smtnouz-9P3Djvx2wEtIHLFQNIzw5LEQhS2xcgFFSEgO4lIQmJrhXsCxA84zf8",
  },
  {
    id: "re-zero",
    title: "Re:Zero",
    genre: "Fantasy, Drama",
    episode: "EP 25",
    rating: "8.5",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbDhwVgI0qbsaIVPZ_TGZ1v9G_p__qe6CM4QKjpe7_T9GblldPshJ2C4i67wXpvMmKBt3QqEOG2lhJQ9O1QGCt2_64pDmvcWczmxptjs-YdeiIJM31Nm22PxNwqRUUhXS34dzfML9bHUKLGLdIIpn1L1GO_f1HY7zVeNSeWLTxv2B6t3qo6PA_HQsLMTCzDrLMHwlcxYnxPM703p-JCVHMW02qUwo3p0UAdYihCgkkRKMLFAuOWQAvvIsHkARObpWVs8SP-fRqQeo",
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    genre: "Dark Fantasy, Horror",
    episode: "EP 11",
    rating: "9.0",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCG9s3rjzHXgqF1_0J69NFWC6iH9X8rw-UJY6VZo6VOsykG9pfk3aJqn2HQh0k3geQYRaPZ0riBJscN9G70fSM8o78Ksa3gyg4Obkk6CFu6WW57WvBFxUF4aEaVHefOi_lu0MyCRoTCNE-xG1E2u8IfOsfiuFtjpnMjNzIgEn2WMs-aOf0vYSsJL43vCSYZK8oiXPZq2kQZbHPYwfLElrVNhLRfx5xEmEy30dj7gBmffQYXXBJFQDeDFG4qt8fNk8bSryHnJRkx9Ik",
  },
];

export default function RecommendedAnimeSection({
  animeList = defaultAnimeList,
}: RecommendedAnimeProps) {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          You Might Also Like
        </h2>
        <div className="flex gap-2">
          <button className="size-8 rounded-full bg-surface-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
          </button>
          <button className="size-8 rounded-full bg-surface-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
        {animeList.map((anime, index) => (
          <Link
            key={index}
            href={`/anime/${anime.id}`}
            className={`group cursor-pointer ${
              index === 4 ? "hidden lg:block" : ""
            } ${index === 5 ? "hidden xl:block" : ""}`}
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
              <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                {anime.episode}
              </div>
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 z-10">
                <span className="material-symbols-outlined text-[10px] text-yellow-400 fill-1">
                  star
                </span>{" "}
                {anime.rating}
              </div>
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={anime.title}
                src={anime.poster}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="size-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="material-symbols-outlined fill-1">
                    play_arrow
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {anime.title}
            </h3>
            <p className="text-slate-400 text-xs mt-1">{anime.genre}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
