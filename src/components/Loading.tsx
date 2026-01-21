export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Spinner */}
      <div className="mb-6">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>

      {/* Loading Text */}
      <p className="text-lg text-neutral-700">Finding your best pet match…</p>
    </div>
  );
}
