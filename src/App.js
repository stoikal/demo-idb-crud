import 'regenerator-runtime';
import React, { useState, useEffect } from 'react';
import { Grommet, Button, Main, Box, Pagination } from 'grommet';
import ProductList from './data/product-list-idb';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import generateMockProducts from './utils/generateMockProducts';

const theme = {
  global: {
    font: {
      family: 'sans-serif',
      size: '18px',
      height: '20px',
    },
  },
};

const App = () => {
  const [list, setList] = useState([]);
  const [itemCount, setItemCount] = useState(null);
  const [page, setPage] = useState(1);

  const LIMIT = 10;

  const getProductList = async () => {
    const offset = LIMIT * page - LIMIT;
    const res = await ProductList.get({ limit: LIMIT, offset });
    setList(res);
  };

  const getItemCount = async () => {
    const count = await ProductList.count();
    setItemCount(count);
  };

  const updatePage = () => {
    getProductList();
    getItemCount();
  };

  useEffect(() => {
    updatePage();
  }, [page]);

  const generateProducts = async () => {
    await ProductList.putMany(generateMockProducts(10));
    updatePage();
  };

  const handleSubmit = async (product) => {
    await ProductList.put(product);
    updatePage();
  };

  const handleDelete = async (product) => {
    const { name } = product;
    await ProductList.delete(name);

    if (list.length < 2 && page > 1) {
      setPage(page - 1); // page change is being listened by useEffect
    } else {
      updatePage();
    }
  };

  const handlePageChange = ({ page: pageNum }) => {
    setPage(pageNum);
  };

  return (
    <Grommet theme={theme}>
      <Main pad="large" width={{ min: '600px', max: '1000px' }} margin={{ horizontal: 'auto' }}>
        <Box justify="between" margin="small" direction="row">
          <Button onClick={generateProducts} secondary label="Generate 10 products" />
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
        <Box align="center" margin="medium">
          {!!itemCount && (
            <Pagination
              numberItems={itemCount}
              step={LIMIT}
              onChange={handlePageChange}
              page={page}
            />
          )}
        </Box>
      </Main>
    </Grommet>
  );
};

export default App;
