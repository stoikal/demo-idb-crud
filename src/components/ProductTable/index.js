import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'grommet';
import formatCurrency from '../../utils/formatCurrency';

const ProductTable = ({ list }) => {
  const renderPrice = (name) => (data) => formatCurrency(data[name]);

  return (
    <DataTable
      columns={[
        {
          header: 'Gambar',
        },
        {
          property: 'name',
          header: 'Nama',
          primary: true,
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
          render: renderPrice('sellingPrice'),
        },
        {
          header: 'Aksi',
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
