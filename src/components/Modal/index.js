import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layer, Box } from 'grommet';

const Modal = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen((prevVal) => !prevVal);
  };

  const triggerElement = trigger && React.cloneElement(
    trigger,
    { onClick: toggleOpen },
  );

  return (
    <>
      {triggerElement}
      {isOpen && (
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
};

Modal.propTypes = {
  trigger: PropTypes.node,
  children: PropTypes.node,
};

export default Modal;
