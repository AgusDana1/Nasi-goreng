import { useState } from "react";
import { Menu, Plus, Minus } from "lucide-react";
import data from "./data.json";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const [showCartDetail, setShowCartDetail] = useState(false);
  const [cart, setCart] = useState([]);
  const phone = import.meta.env.VITE_WA_NUMBER;

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

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white pb-32">

      {/* NAVBAR */}
      <div className="fixed top-4 left-0 w-full z-50 px-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">

          <h1 className="font-bold text-lg">
            {data.businessName}
          </h1>

          <button onClick={() => setOpen(!open)}>
            <Menu />
          </button>
        </div>

        {open && (
          <div className="mt-2 backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-3 flex flex-col gap-2">
            <a href="#menu">Menu</a>
          </div>
        )}
      </div>

      <div className="h-24"></div>

      {/* HERO */}
      <section className="px-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-3xl shadow-xl">

          <h2 className="text-xl font-bold">
            🍽️ {data.businessName}
          </h2>

          <p className="text-sm opacity-90">
            Makanan enak & siap antar 🚀
          </p>

          <div className="flex justify-between mt-4 text-sm">
            <span>🕒 {data.openHours}</span>

            <span
              className={
                isOpenNow()
                  ? "text-green-200"
                  : "text-red-200"
              }
            >
              {isOpenNow() ? "Buka" : "Tutup"}
            </span>
          </div>
        </div>
      </section>

      {/* BEST SELLER */}
      <section className="px-4 mb-6">
        <h2 className="font-bold mb-3">🔥 Best Seller</h2>

        <div className="flex gap-4 overflow-x-auto">
          {data.menu
            .filter((i) => i.bestSeller)
            .map((item) => (
              <div
                key={item.id}
                className="min-w-[180px] backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={item.images}
                    className="h-28 w-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-lg font-bold">
                    ⭐ Best
                  </span>
                </div>

                <div className="p-3">
                  <p className="font-semibold text-sm">
                    {item.name}
                  </p>

                  <p className="text-xs opacity-70">
                    {formatRupiah(item.price)}
                  </p>

                  <button
                    onClick={() => addCart(item)}
                    className="mt-2 w-full bg-white text-black py-1 rounded-lg text-sm"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="px-4">
        <h2 className="font-bold mb-4">Menu</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.menu.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition"
            >
              <div className="relative">
                <img
                  src={item.images}
                  className="h-28 w-full object-cover"
                />

                {item.bestSeller && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-lg font-bold">
                    ⭐
                  </span>
                )}
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold">
                  {item.name}
                </h3>

                <p className="text-xs opacity-70">
                  {formatRupiah(item.price)}
                </p>

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => addCart(item)}
                    className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-full"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 p-4">

          <p
            className="text-sm truncate"
            onClick={() =>
              setShowCartDetail(!showCartDetail)
            }
          >
            {cartSummary()}
          </p>

          <p className="font-bold">
            {formatRupiah(totalPrice)}
          </p>

          {showCartDetail && (
            <div className="mt-2 max-h-40 overflow-y-auto text-sm">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-1"
                >
                  <span>{item.name}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateQty(item.id, "dec")
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(item.id, "inc")
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={goToWa}
            disabled={!isOpenNow()}
            className={`w-full mt-2 py-3 rounded-xl font-bold ${
              isOpenNow()
                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black"
                : "bg-gray-500"
            }`}
          >
            {isOpenNow()
              ? "Pesan Sekarang"
              : "Tutup"}
          </button>
        </div>
      )}
    </div>
  );
}
