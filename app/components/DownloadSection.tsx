import { EpisodeDetailResponse } from "@/lib/api";

type DownloadData = EpisodeDetailResponse["data"]["downloadUrl"];

interface DownloadSectionProps {
  downloadData: DownloadData;
}

export default function DownloadSection({ downloadData }: DownloadSectionProps) {
  return (
    <div className="w-full bg-gradient-to-r from-slate-100 to-white dark:from-surface-dark dark:to-surface-dark/50 p-6 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">download</span>
          Download this Episode
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Save for offline viewing. Multiple qualities available.
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        {downloadData.qualities.map((quality, qIndex) => (
          <div key={qIndex} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-white/5 last:border-0 pb-4 last:pb-0">
             <div className="min-w-[80px] flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  {quality.title}
                </span>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                   {quality.size}
                </span>
             </div>
             
             <div className="flex flex-wrap gap-2 flex-1">
                {quality.urls.map((link, lIndex) => (
                  <a
                    key={lIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold 
                      bg-surface-dark border border-white/10 text-slate-300
                      transition-all duration-200 
                      hover:border-primary hover:text-white hover:bg-primary/5
                      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] group-hover:text-primary transition-colors">
                      cloud_download
                    </span>
                    {link.title}
                  </a>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
