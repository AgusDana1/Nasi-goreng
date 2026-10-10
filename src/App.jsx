import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "./data.json";
import "./index.css";

import Navbar from "./components/Navbar";
import OpenHours from "./components/OpenHours";
import BestSeller from "./components/BestSeller";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";

import { useCart } from "./hooks/useCart";
import { goToWa } from "./utils/whatsapp";

// ── Feature items for the strip below hero ──────────────
const FEATURES = [
  {
    icon: "🍳",
    title: "Masakan Segar",
    desc: "Dimasak langsung saat dipesan, selalu fresh dan lezat",
  },
  {
    icon: "🛵",
    title: "Pesan via WhatsApp",
    desc: "Mudah dan cepat, langsung konfirmasi ke penjual",
  },
  {
    icon: "💰",
    title: "Harga Terjangkau",
    desc: "Porsi kenyang, harga bersahabat untuk semua kalangan",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const { cart, addCart, updateQty, totalPrice, totalItems } = useCart();
  const phone = import.meta.env.VITE_WA_NUMBER;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const categories = [
    "Semua",
    ...new Set(data.menu.map((item) => item.category).filter(Boolean)),
  ];

  const bestSellerMenu = data.menu.filter((item) => item.bestSeller);

  const filteredMenu = data.menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "Semua" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const isOpenNow = () => {
    if (!data?.openHours) return true;
    const parts = data.openHours.split("-");
    if (parts.length < 2) return true;
    const [start, end] = parts.map((p) => p.trim());
    const [sH, sM] = start.split(":").map(Number);
    const [eH, eM] = end.split(":").map(Number);
    if ([sH, sM, eH, eM].some(isNaN)) return true;
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Makassar" })
    );
    const current = now.getHours() * 60 + now.getMinutes();
    return current >= sH * 60 + sM && current <= eH * 60 + eM;
  };

  const handleOrder = () => goToWa(phone, cart, totalPrice);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ════════════════════════════════════
          NAVBAR
      ════════════════════════════════════ */}
      <Navbar
        search={search}
        setSearch={setSearch}
        businessName={data.businessName}
      />

      {/* ════════════════════════════════════
          HERO — Dark Split Section
      ════════════════════════════════════ */}
      <section className="relative bg-[#0f0f0f] min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background texture blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 py-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* ── Text Side ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
              >
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                Warung Terpercaya
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5">
                Cita Rasa{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  Nusantara
                </span>{" "}
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Pesan Dan Rasakan Kenikmatannya!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-full text-base shadow-lg shadow-orange-500/30 transition-all"
                >
                  <span>🍽️</span>
                  <span>Lihat Menu</span>
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-semibold px-6 py-3.5 rounded-full text-base transition-all"
                >
                  <span>🔥</span>
                  <span>Best Seller</span>
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-10">
                <div>
                  <p className="text-2xl font-extrabold text-white">{data.menu.length}+</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Menu Tersedia</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-extrabold text-white">
                    {data.menu.filter((m) => m.bestSeller).length}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Best Seller</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-extrabold text-orange-400">{data.openHours}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Jam Buka</p>
                </div>
              </div>
            </motion.div>

            {/* ── Image Side ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="relative flex items-center justify-center"
            >
              {/* Decorative rings */}
              <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-orange-500/15" />
              <div className="absolute w-[290px] h-[290px] md:w-[360px] md:h-[360px] rounded-full border-2 border-orange-500/25" />
              <div className="absolute w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full bg-orange-500/8" />

              {/* Glow */}
              <div className="absolute w-60 h-60 bg-orange-500/20 rounded-full blur-3xl" />

              {/* Main food image */}
              <div className="relative z-10 w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src="/images/nasgor-spesial.jpg"
                  alt="Nasi Goreng Spesial"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-4 right-4 md:top-8 md:right-0 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5"
              >
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-xs font-extrabold text-gray-800 leading-tight">Best Seller</p>
                  <p className="text-[10px] text-gray-400">Paling Laris!</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-0 bg-orange-500 rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2"
              >
                <span className="text-lg">⭐</span>
                <div>
                  <p className="text-xs font-extrabold text-white leading-tight">Rating Tinggi</p>
                  <p className="text-[10px] text-orange-200">Pelanggan Setia</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════
          FEATURES STRIP — White
      ════════════════════════════════════ */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{f.title}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          OPEN HOURS — White
      ════════════════════════════════════ */}
      <div className="bg-white pb-6">
        <OpenHours openHours={data.openHours} isOpen={isOpenNow()} />
      </div>

      {/* ════════════════════════════════════
          BEST SELLER — White
      ════════════════════════════════════ */}
      <BestSeller items={bestSellerMenu} onAdd={addCart} />

      {/* ════════════════════════════════════
          DARK CTA BANNER
      ════════════════════════════════════ */}
      <section className="bg-[#0f0f0f] py-14 px-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-2">
              — Tunggu Apa Lagi —
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Pesan Sekarang,<br />
              <span className="text-orange-400">Nikmat Langsung!</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-sm">
              Pilih menu favoritmu, dan kami siapkan langsung untuk kamu 🍳
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-3 flex-shrink-0"
          >
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-lg shadow-orange-500/25 transition-all"
            >
              🍽️ Lihat Menu
            </a>
          </motion.div>
        </div>

        {/* Food images row */}
        <div className="max-w-6xl mx-auto mt-10 flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {data.menu.slice(0, 5).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/10"
            >
              <img src={item.images} alt={item.name} className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center">
            <span className="text-white/60 text-xs font-semibold">+{data.menu.length - 5}</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MENU SECTION — Light Gray
      ════════════════════════════════════ */}
      <MenuList
        items={filteredMenu}
        loading={loading}
        onAdd={addCart}
        cart={cart}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* ════════════════════════════════════
          CART — Fixed Bottom
      ════════════════════════════════════ */}
      <AnimatePresence>
        {cart.length > 0 && (
          <Cart
            cart={cart}
            totalPrice={totalPrice}
            totalItems={totalItems}
            updateQty={updateQty}
            onOrder={handleOrder}
            isOpen={isOpenNow()}
          />
        )}
      </AnimatePresence>

      {/* Bottom spacer when cart is visible */}
      {cart.length > 0 && <div className="h-36" />}
    </div>
  );
}
