import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { formatRupiah } from "../utils/formatRupiah";

export default function MenuCard({ item, onAdd, cartQty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col group"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden">
        <img
          src={item.images}
          alt={item.name}
          className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Best Seller badge */}
        {item.bestSeller && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-orange-500/30">
            🔥 Best Seller
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 flex-1">
          {item.name}
        </h3>
        <p className="text-orange-500 font-extrabold text-sm mt-2">
          {formatRupiah(item.price)}
        </p>

        {/* Add Button */}
        <button
          onClick={() => onAdd(item)}
          className={`mt-3 w-full py-2.5 rounded-2xl font-bold flex items-center justify-center gap-1.5 text-sm transition-all active:scale-95 ${
            cartQty > 0
              ? "bg-orange-500 text-white"
              : "bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white"
          }`}
        >
          <Plus size={14} strokeWidth={3} />
          <span>Tambah{cartQty > 0 ? ` (${cartQty})` : ""}</span>
        </button>
      </div>
    </motion.div>
  );
}
