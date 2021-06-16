import React from 'react';
import { Grommet, Button, Main, Box } from 'grommet';
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
      <Main pad="large" width={{ min: '600px', max: '1000px' }} margin={{ horizontal: 'auto' }}>
        <Box align="end" margin="medium">
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
      </Main>
    </Grommet>
  );
};

export default App;
