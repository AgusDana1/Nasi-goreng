export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl overflow-hidden border border-amber-100">
      {/* Image placeholder */}
      <div className="h-36 bg-gradient-to-br from-amber-100 to-orange-100" />
      {/* Content placeholder */}
      <div className="p-3 space-y-2">
        <div className="h-3 bg-amber-100 rounded-full w-4/5" />
        <div className="h-3 bg-amber-100 rounded-full w-2/5" />
        <div className="h-9 bg-amber-100 rounded-xl mt-3" />
      </div>
    </div>
  );
}

