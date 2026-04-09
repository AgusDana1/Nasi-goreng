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
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex justify-between items-center">

          <h1 className="font-bold">{data.businessName}</h1>

          <div className="flex items-center gap-3">

            <button
              className="md:hidden"
              onClick={() =>
                setShowSearchMobile(!showSearchMobile)
              }
            >
              <Search />
            </button>

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

            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
          </div>
        </div>
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

      {/* CATEGORY */}
      <section className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat, index) => (
            <button
              key={`${cat}-${index}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/10 border border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section className="px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={`s-${i}`} />
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
                    <p className="text-sm">
                      {formatRupiah(item.price)}
                    </p>

                    <button
                      onClick={() => addCart(item)}
                      className="mt-2 rounded-full bg-white text-black rounded-lg py-2 px-4"
                    >
                      <Plus />
                    </button>
                  </div>
                </motion.div>
              ))}
        </div>
      </section>

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/80 p-4">

          <p onClick={() => setShowCartDetail(!showCartDetail)}>
            {cartSummary()}
          </p>

          <p className="font-bold">
            {formatRupiah(totalPrice)}
          </p>

          {/* DETAIL CART */}
          <AnimatePresence>
            {showCartDetail && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden mt-2"
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-1"
                  >
                    <span>{item.name}</span>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() =>
                          updateQty(item.id, "dec")
                        }
                      >
                        <Minus size={16} />
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          updateQty(item.id, "inc")
                        }
                      >
                        <Plus size={16} />
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
            className="w-full mt-2 py-3 rounded-xl bg-green-400 text-black font-bold"
          >
            {isOpenNow() ? "Pesan Sekarang" : "Tutup"}
          </button>
        </div>
      )}
    </div>
  );
}
