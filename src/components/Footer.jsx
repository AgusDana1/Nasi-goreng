import { Clock, Phone, MapPin, ChevronUp, Heart, Utensils } from "lucide-react";

export default function Footer({ businessName, openHours, phone }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c0c0c] text-white border-t border-white/10 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-20 sm:h-28 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-10">
          {/* Brand Info (col 5) */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-base sm:text-xl shadow-lg shadow-orange-500/30 flex-shrink-0">
                🍳
              </div>
              <div>
                <h3 className="font-black text-white text-base sm:text-lg tracking-tight">
                  {businessName}
                </h3>
                <p className="text-[10px] sm:text-xs text-orange-400 font-semibold">
                  Cita Rasa Autentik Nusantara
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Menyajikan berbagai varian nasi goreng dan hidangan nusantara lezat
              yang dimasak segar dengan bumbu rempah pilihan setiap hari.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Bahan Segar & Higienis
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-300">
                🔥 Racikan Khas Nusantara
              </span>
            </div>
          </div>

          {/* Quick Links (col 3) */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5 sm:gap-2">
              <Utensils size={13} className="text-orange-500 sm:w-[15px] sm:h-[15px]" /> Navigasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-orange-400 transition-colors inline-block"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="hover:text-orange-400 transition-colors inline-block"
                >
                  Daftar Menu
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="hover:text-orange-400 transition-colors inline-block"
                >
                  Menu Terlaris
                </a>
              </li>
            </ul>
          </div>

          {/* Operational & Contact Info (col 4) */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">
              Informasi & Kontak
            </h4>

            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Clock size={15} className="text-orange-400 flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">Jam Operasional</p>
                  <p className="text-white font-medium">{openHours}</p>
                </div>
              </div>

              {phone && (
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Phone size={15} className="text-orange-400 flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400">Pemesanan WhatsApp</p>
                    <a
                      href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-orange-400 font-medium transition-colors"
                    >
                      +{phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5 sm:gap-3">
                <MapPin size={15} className="text-orange-400 flex-shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400">Layanan</p>
                  <p className="text-white font-medium">Dine-in, Takeaway & Pesan Online via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-gray-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            © {currentYear} <span className="text-white font-semibold">{businessName}</span>. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1 text-gray-400">
              Dibuat dengan <Heart size={12} className="text-red-500 fill-red-500 sm:w-[13px] sm:h-[13px]" /> untuk kuliner Indonesia
            </span>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-orange-500 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition-all active:scale-95 ml-1 sm:ml-2"
              title="Kembali ke atas"
              aria-label="Kembali ke atas"
            >
              <ChevronUp size={14} className="sm:w-[16px] sm:h-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
