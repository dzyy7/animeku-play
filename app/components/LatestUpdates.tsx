import Link from "next/link";

const latestUpdatesData = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcS5DS-WWHLJasOAQZCztuG_bO9ubHfzBbvq44fdECluXwDk4KxJYo7MUeDQF1tuQp3y7k7vCRqrJAjPJSUdSBXd_bfNj-Cc3d1PaBYV4tdlDJZSCONFewHBk9c7UURa0FtDX6TqoougFSU936PrcfSWyIprBJtYpf_ACTRviSBE7kx-ugHmAOeu-0F2-EjrV1dC7n0yZjtvbittv1hNwyUyPaQ1ywYVlFf7PVael71_dRwsQs83vI0XoFbDwZuOh4kjZf-9uGwNE",
    title: "Vinland Saga",
    seasonEpisode: "Season 2 • Episode 18",
    timeAgo: "Just Added",
    isNew: true,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfzPtdzUbsUeeHlIAqSmj3CiFh3Cm-EJEOUFCWPvYiHMChTNnmJyJ5Cs_eYkk-8ACkzehoAgwh4vpQSpzc9uufufqyPRfhDozyC59RiZnLKV56nGDpRqflnzxftp4_wc5ebtisb3DY-q4HbEMoeWX1_HH8BzvSQ_6mddvJyuWtAUnfz58DcMpDGqm6ntpjXB37HYrJ-sWBY9HRoqnkhhp4X9h4vocHIawaWpM65ZK5vFgZ_ZaM6F_wHm7vJYCSOG2OXUJHDKF1CTo",
    title: "Horimiya: The Missing Pieces",
    seasonEpisode: "Season 1 • Episode 4",
    timeAgo: "2 Hours Ago",
    isNew: false,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwR5Ei244XMqkzK9vebm48Hn9xlDo_jJzaXcDoMP4GjaaLm1s1CDNfaRqoQrSxQSM4SiIoVxKiV_v-qqv6HHO5AF8qk06e1VLIRsatIk5kv3VR-VsWCoPduEjfsRDNQxig6Z4SDCKecqaubCdXqQ9Rb38iHqLaSgIEAeRo5zVNxjAs7vjBL9qeGpEWUrtGdfzS_yj0ukLEOTn9g4s-LP9gg3gKuFTAQ7h-rWQT1KWxwvCG80wet0bynli3FQnhy4627tFepjFG3s",
    title: "Bungou Stray Dogs",
    seasonEpisode: "Season 5 • Episode 2",
    timeAgo: "4 Hours Ago",
    isNew: false,
  },
];

export default function LatestUpdates() {
  return (
    <section className="py-6 px-4 md:px-8 lg:px-12 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Latest Updates
        </h2>
        <Link
          className="text-sm text-primary font-medium hover:text-white transition-colors"
          href="#"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestUpdatesData.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-3 rounded-xl bg-surface-dark border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <div className="w-24 aspect-video rounded-lg overflow-hidden bg-black relative shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${item.image}")` }}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <h4 className="font-bold text-white truncate group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{item.seasonEpisode}</p>
              <span
                className={`mt-2 text-[10px] uppercase font-bold tracking-wider ${
                  item.isNew ? "text-green-400" : "text-gray-500"
                }`}
              >
                {item.timeAgo}
              </span>
            </div>
            <div className="flex items-center justify-center px-2">
              <span className="material-symbols-outlined text-gray-500 group-hover:text-white">
                play_circle
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
