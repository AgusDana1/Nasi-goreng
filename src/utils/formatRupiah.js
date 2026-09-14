/**
 * Format angka ke format Rupiah Indonesia
 * @param {number} num
 * @returns {string}
 */
export const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);

