import Link from "next/link";

interface BreadcrumbProps {
  animeTitle: string;
}

export default function Breadcrumb({ animeTitle }: BreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <Link
        className="text-[#94a3b8] hover:text-white transition-colors"
        href="/"
      >
        Home
      </Link>
      <span className="text-[#94a3b8] material-symbols-outlined text-base">
        chevron_right
      </span>
      <span className="text-white font-medium">{animeTitle}</span>
    </div>
  );
}
