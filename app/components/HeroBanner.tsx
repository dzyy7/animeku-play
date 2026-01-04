export default function HeroBanner() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 pt-6 pb-8">
      <div className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] min-h-[500px] group shadow-2xl shadow-primary/10">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBn5Z9HPl9dhGs_oOLvFKNfKNEyL_swWj_8VwVpjx_VzAzv5IDN8uJEUe9RPw1lbl7KIu0G7J_a5upChTFsXIFI-tXGpUsTMTvi4ClG2GW10HeG_BoAPJTLHtmgtC9BpHkeS1OCFaRc71YqRQ9r73VuS_HgcSS8KQfdBTTpF2QSTe-qsqDbwVC9Rkn0qjAI0xxeBxtYq4n9R_KMam79Lh96quZrTIGyAwcnIWJ5Qmc6dfIxUTi9nkU_LzhoJifbSxfFHw_K63fgba4")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md w-fit">
            <span className="material-symbols-outlined text-sm">trending_up</span>{" "}
            Trending #1
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-lg">
            Cyberpunk: Edgerunners
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-300 font-medium">
            <span className="flex items-center gap-1 text-yellow-400">
              <span className="material-symbols-outlined text-sm fill-current">
                star
              </span>{" "}
              4.9
            </span>
            <span>2022</span>
            <span>1 Season</span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-xs">
              Action
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-xs">
              Sci-Fi
            </span>
          </div>
          <p className="text-gray-300 line-clamp-3 text-sm md:text-base leading-relaxed max-w-xl drop-shadow-md">
            In a dystopia riddled with corruption and cybernetic implants, a
            talented but reckless street kid strives to become an edgerunner: a
            mercenary outlaw.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/25">
              <span className="material-symbols-outlined">play_arrow</span>
              Watch Now
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-medium transition-all border border-white/10">
              <span className="material-symbols-outlined">add</span>
              My List
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 right-12 flex gap-2">
          <div className="w-8 h-1 bg-white rounded-full" />
          <div className="w-2 h-1 bg-white/30 rounded-full" />
          <div className="w-2 h-1 bg-white/30 rounded-full" />
          <div className="w-2 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
