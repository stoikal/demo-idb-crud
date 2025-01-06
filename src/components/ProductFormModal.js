import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductForm from './ProductForm';
import Modal from './Modal';
import noop from '../utils/noop';

function ProductFormModal({ trigger, onSubmit: onSubmitProp, initialValue }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (value) => {
    await onSubmitProp(value);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      trigger={trigger}
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <ProductForm
        initialValue={initialValue}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

ProductFormModal.defaultProps = {
  onSubmit: noop,
  initialValue: {
    name: '',
    stock: '',
    costPrice: '',
    sellingPrice: '',
  },
};

ProductFormModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  initialValue: PropTypes.shape({
    name: PropTypes.string,
    stock: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    costPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    sellingPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default ProductFormModal;
