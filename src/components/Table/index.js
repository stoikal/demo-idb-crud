import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
// import PropTypes from 'prop-types';

const Table = () => {

  return (
    <table>
      <thead>
        <td>Gambar</td>
        <td>Nama</td>
        <td>Harga Beli</td>
        <td>Harga Jual</td>
        <td>Aksi</td>
      </thead>
      <tbody>
        <td>...</td>
        <td>halo</td>
        <td>{formatCurrency(25000)}</td>
        <td>{formatCurrency(30000)}</td>
        <td>...</td>
      </tbody>
    </table>
  );
};

Table.propTypes = {
};

export default Table;
