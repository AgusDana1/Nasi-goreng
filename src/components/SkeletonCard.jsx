export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100">
      {/* Image placeholder */}
      <div className="h-28 sm:h-36 md:h-40 bg-gray-200" />
      {/* Content placeholder */}
      <div className="p-2.5 sm:p-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded-full w-4/5" />
        <div className="h-3 bg-gray-200 rounded-full w-2/5" />
        <div className="h-7 sm:h-9 bg-gray-200 rounded-xl mt-2 sm:mt-3" />
      </div>
    </div>
  );
}
