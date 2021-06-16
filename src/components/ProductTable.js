import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, Box, Button } from 'grommet';
import { FormEdit, FormTrash } from 'grommet-icons';
import Modal from './Modal';
import ProductForm from './ProductForm';
import Confirm from './Confirm';
import formatCurrency from '../utils/formatCurrency';

const ProductTable = ({ list }) => {
  const renderPrice = (name) => (data) => formatCurrency(data[name]);

  const renderEditBtn = () => (
    <Box round="full" overflow="hidden" background="status-unknown">
      <Button icon={<FormEdit />} hoverIndicator />
    </Box>
  );

  const renderDeleteBtn = () => (
    <Box round="full" overflow="hidden" background="status-critical">
      <Button icon={<FormTrash />} hoverIndicator />
    </Box>
  );

  const renderActions = (data) => {
    return (
      <Box align="center">
        <Modal
          trigger={renderEditBtn()}
        >
          <ProductForm
            initialValue={data}
          />
        </Modal>
        <Confirm trigger={renderDeleteBtn()} />
      </Box>
    );
  };

  return (
    <DataTable
      primaryKey="name"
      columns={[
        {
          header: 'Gambar',
        },
        {
          property: 'name',
          header: 'Nama',
        },
        {
          property: 'stock',
          header: 'Stok',
        },
        {
          header: 'Harga Beli',
          render: renderPrice('costPrice'),
        },
        {
          header: 'Harga Jual',
          align: 'end',
          render: renderPrice('sellingPrice'),
        },
        {
          header: 'Aksi',
          render: renderActions,
        },
      ]}
      data={list}
    />
  );
};

ProductTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    stock: PropTypes.number,
    costPrice: PropTypes.number,
    sellingPrice: PropTypes.number,
  })).isRequired,
};

export default ProductTable;
