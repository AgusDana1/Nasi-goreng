import { useState, useEffect } from "react";
import { Menu, Plus, Minus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import data from "./data.json";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const [showCartDetail, setShowCartDetail] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const phone = import.meta.env.VITE_WA_NUMBER;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // ================= CATEGORY =================
  const categories = [
    "All",
    ...new Set(
      data.menu.map((item) => item.category).filter(Boolean)
    ),
  ];

  // ================= BEST SELLER ==============
  const bestSellerMenu = data.menu.filter(
      (item) => item.bestSeller
    );

  // ================= FILTER =================
  const filteredMenu = data.menu.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      activeCategory === "All" ||
      item.category === activeCategory;

    return matchSearch && matchCategory;
  });

  // ================= CART =================
  const addCart = (item) => {
    const exist = cart.find((i) => i.id === item.id);

    if (exist) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (type === "inc")
              return { ...item, qty: item.qty + 1 };
            if (type === "dec")
              return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = cart.reduce(
    (t, item) => t + item.price * item.qty,
    0
  );

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const cartSummary = () => {
    const names = cart.map((i) => i.name);
    return names.length > 3
      ? names.slice(0, 3).join(", ") + "..."
      : names.join(", ");
  };

  const generateMessage = () => {
    let text = "Halo, saya ingin memesan:%0A";
    cart.forEach((item) => {
      text += `- ${item.name} (${item.qty}) ${formatRupiah(
        item.price * item.qty
      )}%0A`;
    });
    text += `%0ATotal: ${formatRupiah(totalPrice)}`;
    return text;
  };

  const goToWa = () => {
    window.open(
      `https://wa.me/${phone}?text=${generateMessage()}`,
      "_blank"
    );
  };

  // ================= JAM =================
  const isOpenNow = () => {
    if (!data?.openHours) return true;

    const parts = data.openHours.split("-");
    if (parts.length < 2) return true;

    const [start, end] = parts.map((p) => p.trim());
    const [sH, sM] = start.split(":").map(Number);
    const [eH, eM] = end.split(":").map(Number);

    if ([sH, sM, eH, eM].some(isNaN)) return true;

    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    const startTime = sH * 60 + sM;
    const endTime = eH * 60 + eM;

    return current >= startTime && current <= endTime;
  };

  // ================= SKELETON =================
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white/10 rounded-2xl p-3">
      <div className="h-28 bg-gray-500/30 rounded-xl mb-2"></div>
      <div className="h-3 bg-gray-500/30 rounded w-3/4 mb-1"></div>
      <div className="h-3 bg-gray-500/30 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white pb-32">

      {/* NAVBAR */}
      <div className="fixed top-4 left-0 w-full z-50 px-4">
        <div className="relative z-50 backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex justify-between items-center">

          <h1 className="font-bold">{data.businessName}</h1>

          <div className="flex items-center gap-3">

            {/* SEARCH ICON MOBILE */}
            <button
              className="md:hidden"
              onClick={() =>
                setShowSearchMobile(!showSearchMobile)
              }
            >
              <Search />
            </button>

            {/* SEARCH DESKTOP */}
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Cari menu..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm outline-none"
              />
            </div>

            {/* HAMBURGER */}
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* SEARCH MOBILE */}
        <AnimatePresence>
          {showSearchMobile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-4 mt-2 bg-white/10 backdrop-blur-xl p-3 rounded-xl relative z-50"
            >
              <input
                autoFocus
                type="text"
                placeholder="Cari menu..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-transparent outline-none text-white"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* HAMBURGER MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-4 mt-2 backdrop-blur-xl border border-white/10 text-white text-black rounded-xl p-4 shadow-lg md:hidden relative z-50"
            >
              <div className="flex flex-col gap-3">
                <a href="#" onClick={() => setOpen(false)}>Home</a>
                <a href="#menu" onClick={() => setOpen(false)}>Menu</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-24"></div>

      {/* JAM BUKA */}
      <section className="px-4 mb-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-70">Jam Buka</p>
            <p className="font-semibold">
              {data.openHours}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isOpenNow()
                ? "bg-green-400 text-black"
                : "bg-red-400 text-black"
            }`}
          >
            {isOpenNow() ? "Buka" : "Tutup"}
          </span>
        </div>
      </section>

      {/* BEST SELLER MENU */}
      {bestSellerMenu.length > 0 && (
        <section className="px-4 mb-4">
          <h2 className="font-bold mb-2">Best Seller</h2>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {bestSellerMenu.map((item) => (
              <div key={`best-${item.id}`} className="min-w-[140px] bg-white/10 rounded-2xl p-2">
                <img src={item.images} className="h-20 w-full object-cover rounded-lg" />

                <p className="text-sm mt-1">{item.name}</p>
                <p className="text-xs opacity-70">
                  {formatRupiah(item.price)}
                </p>

                <div className="flex justify-end mt-1">
                  <button onClick={() => addCart(item)} className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CATEGORY */}
      <section className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat, i) => (
            <button
              key={`${cat}-${i}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 rounded-2xl overflow-hidden"
                >
                  <img
                    src={item.images}
                    className="h-28 w-full object-cover"
                  />

                  <div className="p-3">
                    <h3>{item.name}</h3>
                    <p>{formatRupiah(item.price)}</p>

                    <div className="flex justify-end mt-2">
                      <button onClick={() => addCart(item)} className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full">
                    <Plus size={18} />
                  </button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </section>

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 w-full bg-black/80 p-4">

          <p onClick={() => setShowCartDetail(!showCartDetail)}>
            {cartSummary()}
          </p>

          <p>{formatRupiah(totalPrice)}</p>

          <AnimatePresence>
            {showCartDetail && (
              <motion.div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>{item.name}</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateQty(item.id, "dec")
                        }
                      >
                        <Minus />
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          updateQty(item.id, "inc")
                        }
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={goToWa}
            disabled={!isOpenNow()}
            className="w-full mt-2 bg-green-400 text-black py-2 rounded-lg"
          >
            {isOpenNow() ? "Pesan Sekarang" : "Tutup"}
          </button>
        </div>
      )}
    </div>
  );
}
