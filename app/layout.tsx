import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AniKuPlay",
  description: "The best place to watch anime online for free. High quality, fast streaming, and minimal ads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-dark font-display text-white selection:bg-primary selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
