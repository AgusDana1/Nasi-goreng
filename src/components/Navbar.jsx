import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ search, setSearch, businessName }) {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* ── Main Bar ── */}
      <nav className="bg-[#0f0f0f]/95 backdrop-blur-lg border-b border-white/5 px-4 py-3 sm:px-5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-6">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-orange-500 rounded-xl flex items-center justify-center text-base sm:text-lg">
              🍳
            </div>
            <div>
              <p className="font-extrabold text-white text-xs sm:text-sm leading-tight tracking-tight">
                {businessName}
              </p>
              <p className="text-[9px] sm:text-[10px] text-orange-400 font-semibold">
                Masakan Nusantara
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
            >
              Beranda
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#menu"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
            >
              Menu
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Desktop: Search + CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 transition-colors">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Cari menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-32"
              />
            </div>
            <a
              href="#menu"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap"
            >
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={() => { setShowSearch(!showSearch); setOpen(false); }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                showSearch
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300"
              }`}
            >
              <Search size={13} />
            </button>
            <button
              onClick={() => { setOpen(!open); setShowSearch(false); }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                open
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300"
              }`}
            >
              {open ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Search ── */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#0f0f0f] border-b border-white/5"
          >
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-2 focus-within:border-orange-500/50 transition-colors">
                <Search size={13} className="text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari menu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-gray-500 outline-none flex-1"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#0f0f0f] border-b border-white/5"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 text-xs sm:text-sm font-medium transition-colors"
              >
                <span>🏠</span> Beranda
              </a>
              <a
                href="#menu"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 text-xs sm:text-sm font-medium transition-colors"
              >
                <span>🍽️</span> Menu
              </a>
              <div className="pt-2 mt-1 border-t border-white/5">
                <a
                  href="#menu"
                  onClick={() => setOpen(false)}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 text-center text-xs sm:text-sm rounded-xl transition-colors"
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}