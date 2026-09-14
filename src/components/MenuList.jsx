import MenuCard from "./MenuCard";
import SkeletonCard from "./SkeletonCard";
import CategoryFilter from "./CategoryFilter";

export default function MenuList({ items, loading, onAdd, cart, categories, activeCategory, setActiveCategory }) {
  const getCartQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  return (
    <section id="menu" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-orange-500 text-sm font-bold uppercase tracking-widest mb-2">
            — Pilih Sesuai Selera —
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Menu Lengkap Kami 🍽️
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : items.length > 0
            ? items.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAdd={onAdd}
                  cartQty={getCartQty(item.id)}
                />
              ))
            : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-bold text-gray-600 text-lg">Menu tidak ditemukan</p>
                <p className="text-gray-400 text-sm mt-1">Coba kata kunci atau kategori lain</p>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
