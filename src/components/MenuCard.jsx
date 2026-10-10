import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { formatRupiah } from "../utils/formatRupiah";

export default function MenuCard({ item, onAdd, cartQty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden">
        <img
          src={item.images}
          alt={item.name}
          className="h-28 sm:h-36 md:h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Best Seller badge */}
        {item.bestSeller && (
          <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md shadow-orange-500/30">
            🔥 Best Seller
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 flex-1 min-h-[30px] sm:min-h-0">
          {item.name}
        </h3>
        <p className="text-orange-500 font-extrabold text-xs sm:text-sm mt-1 sm:mt-2">
          {formatRupiah(item.price)}
        </p>

        {/* Add Button */}
        <button
          onClick={() => onAdd(item)}
          className={`mt-2 sm:mt-3 w-full py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm transition-all active:scale-95 ${
            cartQty > 0
              ? "bg-orange-500 text-white"
              : "bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white"
          }`}
        >
          <Plus size={12} className="sm:w-[14px] sm:h-[14px]" strokeWidth={3} />
          <span>Tambah{cartQty > 0 ? ` (${cartQty})` : ""}</span>
        </button>
      </div>
    </motion.div>
  );
}
