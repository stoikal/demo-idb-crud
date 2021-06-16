function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export default function generateProducts(amount, startFrom = 1) {
  const list = [];

  for (let i = startFrom; i < startFrom + amount; i += 1) {
    const cost = randomIntFromInterval(100, 1000) * 1000;

    list.push({
      image: '',
      name: `Produk ${randomString(5)}`,
      costPrice: cost,
      sellingPrice: cost + cost * 0.1,
      stock: randomIntFromInterval(0, 100),
    });
  }

  return list;
}
