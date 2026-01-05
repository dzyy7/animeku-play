import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-surface-dark py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center gap-3 text-white" href="/">
              <img 
                  src="/favicon.ico" 
                  alt="Logo" 
                  className="w-12 h-12 "
                />
                <h2 className="text-xl font-bold tracking-tight">AniKuPlay</h2>
          </Link>
          <p className="text-sm text-gray-400 max-w-xs">
            The best place to watch anime online for free. High quality, fast
            streaming, and minimal ads.
          </p>
        </div>
        <div className="flex gap-12 text-sm text-gray-400">
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold mb-2">Navigation</h4>
            <Link className="hover:text-primary" href="/">
              Home
            </Link>
            <Link className="hover:text-primary" href="/AnimeList">
              Anime List
            </Link>
            <Link className="hover:text-primary" href="/genre">
              Genres
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold mb-2">Support</h4>
            <Link className="hover:text-primary" href="https://nyawer.co/AlGhazam">
              Saweria
            </Link>
            <a className="hover:text-primary" href="https://dzaky-porto.vercel.app">
              Admin
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
        © 2026 AniKuPlay. All rights reserved. This site does not store any
        files on its server.
      </div>
    </footer>
  );
}
