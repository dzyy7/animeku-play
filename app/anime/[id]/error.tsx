"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Terjadi kesalahan</h1>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Coba lagi
      </button>
    </div>
  );
}
