import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, Box, Button } from 'grommet';
import { FormEdit, FormTrash } from 'grommet-icons';
import ProductFormModal from './ProductFormModal';
import Confirm from './Confirm';
import formatCurrency from '../utils/formatCurrency';
import noop from '../utils/noop';

const ProductTable = ({ list, onSubmitProduct, onDeleteProduct }) => {
  const renderPrice = (name) => (data) => formatCurrency(data[name]);

  const renderEditBtn = () => (
    <Box round="full" overflow="hidden" background="status-unknown" margin="xxsmall">
      <Button icon={<FormEdit />} hoverIndicator />
    </Box>
  );

  const renderDeleteBtn = () => (
    <Box round="full" overflow="hidden" background="status-critical" margin="xxsmall">
      <Button icon={<FormTrash />} hoverIndicator />
    </Box>
  );

  const createConfirmHandler = (product) => () => {
    onDeleteProduct(product);
  };

  const renderActions = (product) => {
    return (
      <div style={{ display: 'flex' }}>
        <ProductFormModal
          initialValue={product}
          trigger={renderEditBtn()}
          onSubmit={onSubmitProduct}
        />
        <Confirm trigger={renderDeleteBtn()} onOk={createConfirmHandler(product)} />
      </div>
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
          align: 'end',
          render: renderPrice('costPrice'),
        },
        {
          header: 'Harga Jual',
          align: 'end',
          render: renderPrice('sellingPrice'),
        },
        {
          header: 'Aksi',
          align: 'center',
          render: renderActions,
        },
      ]}
      data={list}
    />
  );
};

ProductTable.defaultProps = {
  onDeleteProduct: noop,
  onSubmitProduct: noop,
};

ProductTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    stock: PropTypes.number,
    costPrice: PropTypes.number,
    sellingPrice: PropTypes.number,
  })).isRequired,
  onDeleteProduct: PropTypes.func,
  onSubmitProduct: PropTypes.func,
};

export default ProductTable;
