import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { formatRupiah } from "../utils/formatRupiah";

export default function Cart({ cart, totalPrice, totalItems, updateQty, onOrder, isOpen }) {
  const [expanded, setExpanded] = useState(false);

  if (cart.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed bottom-0 left-0 right-0 z-40"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#111111] border-t border-white/10 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-6 rounded-t-2xl sm:rounded-t-3xl">

          {/* ── Expanded Item List ── */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="cart-items"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-3 sm:mb-4"
              >
                <div className="space-y-0.5 max-h-48 sm:max-h-52 overflow-y-auto pb-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 sm:gap-3 py-2 sm:py-2.5 border-b border-white/5 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-[11px] sm:text-xs text-orange-400 font-medium mt-0.5">
                          {formatRupiah(item.price * item.qty)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateQty(item.id, "dec")}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Minus size={11} className="sm:w-[13px] sm:h-[13px]" strokeWidth={2.5} />
                        </button>
                        <span className="text-xs sm:text-sm font-bold text-white w-4 sm:w-5 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, "inc")}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Plus size={11} className="sm:w-[13px] sm:h-[13px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Divider */}
                <div className="border-t border-dashed border-white/10 mt-1.5 mb-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Summary Row ── */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 text-left"
          >
            {/* Icon + Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-orange-500/15 border border-orange-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <ShoppingCart size={16} className="text-orange-400 sm:w-[19px] sm:h-[19px]" />
              </div>
              <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-orange-500 text-white text-[9px] sm:text-[10px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            </div>
            {/* Text */}
            <div className="flex-1">
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                {cart.length} jenis menu
              </p>
              <p className="font-extrabold text-white text-sm sm:text-base">
                {formatRupiah(totalPrice)}
              </p>
            </div>
            {/* Chevron */}
            <div className="text-gray-500">
              {expanded ? <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" /> : <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </div>
          </button>

          {/* ── Order Button ── */}
          <button
            onClick={onOrder}
            disabled={!isOpen}
            className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isOpen
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
            }`}
          >
            {isOpen ? (
              <>
                <span className="text-base sm:text-xl">🛵</span>
                <span>Pesan via WhatsApp</span>
              </>
            ) : (
              <>
                <span>⏰</span>
                <span>Warung Sedang Tutup</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
