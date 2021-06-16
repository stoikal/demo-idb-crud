import React from 'react';
import { Grommet, Button, Box } from 'grommet';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import Modal from './components/Modal';
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

const list = generateMockProducts(10);

const App = () => {
  return (
    <Grommet theme={theme}>
      <Box align="center">
        <Modal
          trigger={
            <Button primary label="+ tambah produk" />
          }
        >
          <ProductForm />
        </Modal>
      </Box>
      <ProductTable
        list={list}
      />
    </Grommet>
  );
};

export default App;
