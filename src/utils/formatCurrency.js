export default function formatCurrency(num) {
  return num
    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    .replace(/\s/, ''); // no space after Rp according to PUEBI
}
