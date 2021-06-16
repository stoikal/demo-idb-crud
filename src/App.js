import React from 'react';
import ProductTable from './components/ProductTable';

const list = [];
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateList(amount) {
  for (let i = 0; i < amount; i += 1) {
    const cost = randomIntFromInterval(100, 1000) * 1000;

    list.push({
      image: '',
      name: `Barang ${i + 1}`,
      costPrice: cost,
      sellingPrice: cost + cost * 0.1,
      stock: randomIntFromInterval(10, 100),
    });
  }
}

generateList(10);

const App = () => {
  const title = 'hello world';

  return (
    <>
      <div>{title}</div>
      <ProductTable
        list={list}
      />
    </>
  );
};

export default App;
