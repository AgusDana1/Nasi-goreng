import { formatRupiah } from "./formatRupiah";

/**
 * Generate pesan WhatsApp dari isi keranjang
 * @param {Array} cart
 * @param {number} totalPrice
 * @returns {string}
 */
export const generateMessage = (cart, totalPrice) => {
  let text = "Halo, saya ingin memesan:%0A%0A";
  cart.forEach((item) => {
    text += `- ${item.name} x${item.qty} = ${formatRupiah(item.price * item.qty)}%0A`;
  });
  text += `%0A*Total: ${formatRupiah(totalPrice)}*`;
  return text;
};

/**
 * Buka WhatsApp dengan pesan pesanan
 * @param {string} phone
 * @param {Array} cart
 * @param {number} totalPrice
 */
export const goToWa = (phone, cart, totalPrice) => {
  const message = generateMessage(cart, totalPrice);
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
};

