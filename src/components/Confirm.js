import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Button } from 'grommet';
import Modal from './Modal';
import noop from '../utils/noop';

function Confirm({ trigger, onOk: onOkProp }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOk = async () => {
    await onOkProp();
    setIsOpen(false);
  };

  return (
    <Modal trigger={trigger} onClose={handleClose} onOpen={handleOpen} isOpen={isOpen}>
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Konfirmasi
        </Heading>
        <Text>Anda yakin ingin menghapus produk ini?</Text>
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad={{ top: 'medium', bottom: 'small' }}
        >
          <Button
            label="Ya, hapus"
            onClick={handleOk}
            primary
            color="status-critical"
          />
          <Button
            label="Batal"
            onClick={handleCancel}
            color="dark-3"
          />
        </Box>
      </Box>
    </Modal>
  );
}

Confirm.defaultProps = {
  onOk: noop,
};

Confirm.propTypes = {
  trigger: PropTypes.node.isRequired,
  onOk: PropTypes.func,
};

export default Confirm;
