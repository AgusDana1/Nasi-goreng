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
        <div className="bg-[#111111] border-t border-white/10 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] px-5 pt-4 pb-6 rounded-t-3xl">

          {/* ── Expanded Item List ── */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="cart-items"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-4"
              >
                <div className="space-y-1 max-h-52 overflow-y-auto pb-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-xs text-orange-400 font-medium mt-0.5">
                          {formatRupiah(item.price * item.qty)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateQty(item.id, "dec")}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="text-sm font-bold text-white w-5 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, "inc")}
                          className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Divider */}
                <div className="border-t border-dashed border-white/10 mt-2 mb-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Summary Row ── */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center gap-3 mb-4 text-left"
          >
            {/* Icon + Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 bg-orange-500/15 border border-orange-500/30 rounded-2xl flex items-center justify-center">
                <ShoppingCart size={19} className="text-orange-400" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            </div>
            {/* Text */}
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">
                {cart.length} jenis menu
              </p>
              <p className="font-extrabold text-white text-base">
                {formatRupiah(totalPrice)}
              </p>
            </div>
            {/* Chevron */}
            <div className="text-gray-500">
              {expanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
          </button>

          {/* ── Order Button ── */}
          <button
            onClick={onOrder}
            disabled={!isOpen}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all active:scale-95 ${
              isOpen
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
            }`}
          >
            {isOpen ? (
              <>
                <span className="text-xl">🛵</span>
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
