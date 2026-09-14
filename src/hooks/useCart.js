import { useState } from "react";

/**
 * Custom hook untuk manajemen keranjang belanja
 */
export function useCart() {
  const [cart, setCart] = useState([]);

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
            if (type === "inc") return { ...item, qty: item.qty + 1 };
            if (type === "dec") return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  return { cart, addCart, updateQty, totalPrice, totalItems };
}

