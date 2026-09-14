export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => setActiveCategory(cat)}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
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
