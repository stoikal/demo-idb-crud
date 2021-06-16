import React from 'react';
import { Grommet, Button } from 'grommet';
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
  const title = 'hello world';

  return (
    <Grommet theme={theme}>
      <div>{title}</div>
      <ProductTable
        list={list}
      />
      <Modal
        trigger={
          <Button primary label="+ tambah produk" />
        }
      >
        <ProductForm />
      </Modal>
    </Grommet>
  );
};

export default App;
