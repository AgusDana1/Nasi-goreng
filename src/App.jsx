import { useState } from "react";
import {Menu, Plus, Minus} from 'lucide-react';
import data from "./data.json";
import "./App.css"

export default function App() 
{
  const [open, setOpen] = useState(false);
  const [showCartDetail, setShowCartDetail] = useState(false);
  const [cart, setCart] = useState([]);
  const phone = import.meta.env.VITE_WA_NUMBER;

  // addCart
  const addCart = (item) => {
    const exist = cart.find((i) => i.id === item.id);

    if (exist) {
      setCart(
        cart.map((i) => 
        i.id === item.id ? {... i, qty: i.qty + 1}: i
      )
      );
    } else {
      setCart([...cart, {...item, qty: 1}]);
    }
  };

  // Logic untuk generate message
  const generateMessage = () => {
    let text = "Halo, saya ingin memesan: %0A";

    cart.forEach((item) => {
      const itemTotal = item.price * item.qty;
      text += `- ${item.name} (${item.qty}) ${formatRupiah(itemTotal)}%0A`;
    });

    text += `%0ATotal: ${formatRupiah(totalPrice)}`;
    return text;
  };

  const goToWa = () => {
    const message = generateMessage();
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  // logika untuk mengurangi pesanan
  const updateQty = (id, type) => {
    setCart((prevCart) => 
    prevCart.map((item) => {
      if (item.id === id) {
        if (type === "inc") {
          return { ...item, qty: item.qty + 1};
        } else if (type === "dec") {
          return { ...item, qty: item.qty - 1};
        }
      }
      return item;
    })
    .filter((item) => item.qty > 0)
  )
  }

  // logika untuk menghandle batas tampilan width cart bottom
  const cartSummary = () => {
    const name = cart.map((item) => item.name);

    if (name.length > 3) {
      return name.slice(0, 3).join(", ") + "...";
    }

    return name.join(", ");
  }

  // logic total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  // logic untuk mengubah currency ke rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style:"currency",
      currency: "IDR"
    }).format(number);
  }

  // logika untuk memberitahu apakah toko buka sekarang atau belum
  const isOpenNow = () => {
    if (!data?.openHours) return true;

    const parts = data.openHours.split("-");
    if (parts.length < 2) return true;

    const start = parts[0].trim();
    const end = parts[1].trim();

    const [sH, sM] = start.split(":").map(Number);
    const [eH, eM] = end.split(":").map(Number);

    if (
      [sH, sM, eH, eM].some((n) => isNaN(n))
    ) return true;

    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const startTime = sH * 60 + sM;
    const endTime = eH * 60 + eM;

    return currentMinutes >= startTime && current <= endTime;
  }

  // Logic untuk tampilan web
  return (
    <>
    <div style={{paddingBottom: "100px"}}>
      {/* Navbar */}
      <div className="fixed top-4 left-0 w-full z-50">
        <div className="w-full mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md px-6 py-3 flex items-center justify-between">

            {/* LEFT */}
            <h1 className="font-bold text-[#1A3263]">
              {data.businessName}
            </h1>

            {/* CENTER (DESKTOP) */}
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-[#1A3263]">Home</a>
              <a href="#menu" className="hover:text-[#1A3263]">Menu</a>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* HAMBURGER */}
              <button
                className="md:hidden"
                onClick={() => setOpen(!open)}
              >
                <Menu />
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="mt-2 bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 md:hidden">
              <a href="#">Home</a>
              <a href="#menu">Menu</a>
            </div>
          )}
        </div>
      </div>

      {/* SPACER */}
      <div className="h-15"></div>

      {/* Info Bisnis */}
      <section className="w-full mx-auto px-4 mb-6 mt-20">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
          {/* Jam buka */}
          <p className="text-sm text-gray-600">
            🕒 Jam Buka: <span className="font-semibold">{data.openHours} WITA</span>
          </p>

          {/* STATUS */}
            <p
              className={`text-sm font-semibold ${
                isOpenNow() ? "text-green-600" : "text-red-500"
              }`}
            >
              {isOpenNow() ? "🟢 Buka" : "🔴 Tutup"}
            </p>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="w-full mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.menu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between hover:scale-105 transition"
            >
              {/* IMAGE */}
              <div className="h-24 bg-gray-100 rounded-xl mb-3 relative">
                <img src={item.images} alt={item.name} className="h-24 w-full object-cover rounded-xl mb-3 hover:scale-105 transition-all" />

                {/* Best Seller */}
                {item.bestSeller && (
                  <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-lg font-semibold">
                    ⭐ Best Seller
                  </span>
                )}
              </div>

              {/* INFO */}
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">
                  Rp {item.price}
                </p>
              </div>

              {/* BUTTON + */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => addCart(item)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1A3263] text-white text-xl active:scale-90 transition"
                >
                  <Plus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART BOTTOM */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">

          {/* SUMMARY */}
          <p className="text-sm truncate" onClick={() => setShowCartDetail(!showCartDetail)}>
              {cartSummary()}
          </p>

          {/* Total price */}
          <p className="font-semibold text-[#1A3263]">
            {formatRupiah(totalPrice)}
          </p>

          {/* Show cart detail */}
          {showCartDetail && (
            <div className="fixed bottom-20 left-0 w-full bg-white border-t p-4 shadow-lg max-h-60 overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Pesanan</p>

                <button onClick={() => setShowCartDetail(false)} className="text-sm text-red-500">
                  Tutup
                </button>
              </div>

              {/* LIST */}
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-1">
                  <span>{item.name}</span>

                  <div className="flex gap-2 items-center">
                    <button onClick={() => updateQty(item.id, "dec")} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200">
                      <Minus size={14} />
                    </button>

                    <span className="text-sm font-semibold">
                      {item.qty}
                    </span>

                    <button onClick={() => updateQty(item.id, "inc")} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200">
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
              className={`w-full mt-2 py-3 rounded-lg text-white ${
                isOpenNow()
                  ? "bg-[#1A3263]"
                  : "bg-gray-400"
              }`}
            >
              {isOpenNow()
                ? "Pesan Sekarang"
                : "Toko Tutup"}
            </button>
        </div>
      )}
    </div>
    </>
  )
}