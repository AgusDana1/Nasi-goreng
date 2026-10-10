import { motion } from "framer-motion";
import { formatRupiah } from "../utils/formatRupiah";

export default function BestSeller({ items, onAdd }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-orange-500 text-sm font-bold uppercase tracking-widest mb-2">
            — Pilihan Terbaik —
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Menu Paling Diminati 🔥
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Nikmat Dan Bergizi
          </p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="min-w-[160px] max-w-[160px] flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.images}
                  alt={item.name}
                  className="h-28 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md shadow-orange-500/30">
                  🔥 Best Seller
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 min-h-[30px]">
                  {item.name}
                </p>
                <p className="text-orange-500 font-extrabold text-sm mt-1.5">
                  {formatRupiah(item.price)}
                </p>
                <button
                  onClick={() => onAdd(item)}
                  className="w-full mt-2.5 bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white text-xs font-bold py-2 rounded-xl transition-all active:scale-95"
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
