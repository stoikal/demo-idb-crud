import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';

const ProductTable = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Gambar</td>
          <td>Nama</td>
          <td>Stok</td>
          <td>Harga Beli</td>
          <td>Harga Jual</td>
          <td>Aksi</td>
        </tr>
      </thead>
      <tbody>
        {list.map((product) => {
          const { image, name, stock, costPrice, sellingPrice } = product;
          return (
            <tr key={name}>
              <td>{image}</td>
              <td>{name}</td>
              <td>{stock}</td>
              <td>{formatCurrency(costPrice)}</td>
              <td>{formatCurrency(sellingPrice)}</td>
              <td>...</td>
            </tr>
          );
        })}
      </tbody>
    </table>
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
