import 'regenerator-runtime';
import React, { useState, useEffect } from 'react';
import { Grommet, Button, Main, Box } from 'grommet';
import ProductList from './data/product-list-idb';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
// import generateMockProducts from './utils/generateMockProducts';

const theme = {
  global: {
    font: {
      family: 'sans-serif',
      size: '18px',
      height: '20px',
    },
  },
};

// const list = generateMockProducts(10);

const App = () => {
  const [list, setList] = useState([]);

  const getProductList = async () => {
    const res = await ProductList.list();
    setList(res);
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleSubmit = async (product) => {
    await ProductList.put(product);

    getProductList();
  };

  const handleDelete = async (product) => {
    const { name } = product;
    await ProductList.delete(name);

    getProductList();
  };

  return (
    <Grommet theme={theme}>
      <Main pad="large" width={{ min: '600px', max: '1000px' }} margin={{ horizontal: 'auto' }}>
        <Box align="end" margin="small">
          <ProductFormModal
            trigger={
              <Button primary label="+ tambah produk" />
            }
            onSubmit={handleSubmit}
          />
        </Box>
        <ProductTable
          list={list}
          onSubmitProduct={handleSubmit}
          onDeleteProduct={handleDelete}
        />
      </Main>
    </Grommet>
  );
};

export default App;
