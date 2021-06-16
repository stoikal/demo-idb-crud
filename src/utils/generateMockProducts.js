function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function generateProducts(amount, startFrom = 1) {
  const list = [];

  for (let i = startFrom; i < startFrom + amount; i += 1) {
    const cost = randomIntFromInterval(100, 1000) * 1000;

    list.push({
      image: '',
      name: `Barang ${i}`,
      costPrice: cost,
      sellingPrice: cost + cost * 0.1,
      stock: randomIntFromInterval(10, 100),
    });
  }

  return list;
}
