export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar pb-1 px-1">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => setActiveCategory(cat)}
          className={`flex-shrink-0 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
            activeCategory === cat
              ? "bg-orange-500 text-white shadow-md shadow-orange-200"
              : "bg-white text-gray-500 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
