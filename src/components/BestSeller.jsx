import { motion } from "framer-motion";
import { formatRupiah } from "../utils/formatRupiah";

export default function BestSeller({ items, onAdd }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-6 sm:py-10 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-8">
          <span className="inline-block text-orange-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">
            — Pilihan Terbaik —
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
            Menu Paling Diminati 🔥
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-2">
            Nikmat Dan Bergizi
          </p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-2.5 sm:gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="min-w-[130px] max-w-[130px] sm:min-w-[160px] sm:max-w-[160px] flex-shrink-0 bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.images}
                  alt={item.name}
                  className="h-24 sm:h-28 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-orange-500 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 sm:px-2 rounded-full shadow-md shadow-orange-500/30">
                  🔥 Best Seller
                </span>
              </div>
              <div className="p-2.5 sm:p-3">
                <p className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight line-clamp-2 min-h-[28px] sm:min-h-[30px]">
                  {item.name}
                </p>
                <p className="text-orange-500 font-extrabold text-xs sm:text-sm mt-1 sm:mt-1.5">
                  {formatRupiah(item.price)}
                </p>
                <button
                  onClick={() => onAdd(item)}
                  className="w-full mt-2 sm:mt-2.5 bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all active:scale-95"
                >
                  + Tambah
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
