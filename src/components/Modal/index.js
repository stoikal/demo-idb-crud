import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layer, Box } from 'grommet';
import noop from '../../utils/noop';

const Modal = ({ trigger, children, onOpen, onClose, isOpen: isOpenProp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
    onClose();
  };

  const handleOpen = () => {
    onOpen();
    setIsOpen(true);
  };

  const triggerElement = trigger && React.cloneElement(
    trigger,
    { onClick: handleOpen },
  );

  const shouldShowLayer = (() => {
    if (isOpenProp !== null) {
      return isOpenProp;
    }
    return isOpen;
  })();

  return (
    <>
      {triggerElement}
      {shouldShowLayer && (
        <Layer
          position="center"
          onClickOutside={handleClose}
        >
          <Box
            background={{
              color: 'white',
            }}
            elevation="small"
            width="medium"
            pad="medium"
          >
            {children}
          </Box>
        </Layer>
      )}
    </>
  );
};

Modal.defaultProps = {
  trigger: null,
  children: null,
  isOpen: null,
  onOpen: noop,
  onClose: noop,
};

Modal.propTypes = {
  trigger: PropTypes.node,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default Modal;
