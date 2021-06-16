import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, FormField, TextInput, Button, FileInput } from 'grommet';

const ProductForm = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [fileError, setFileError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const fileInputRef = useRef();

  const handleChange = (nextValue) => {
    setValue(nextValue);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList[i];

      if (file.size > 20_000) {
        fileInputRef.current.value = null;
        setFileError('Ukuran berkas melebihi 100kb');
      } else {
        setFileError(null);
      }
    }
  };

  const handleSubmit = (event) => {
    console.log('hello', event.value);
  };

  const isSubmitBtnDisabled = () => {
    return !isFormValid || !!fileError;
  };

  const validateIfNegativeNum = (numStr) => {
    if (Number(numStr) < 0) return 'Tidak boleh kurang dari 0';
    return undefined;
  };

  const onFormValidate = ({ valid }) => {
    setIsFormValid(valid);
  };

  return (
    <Form
      value={value}
      validate="change"
      onSubmit={handleSubmit}
      onChange={handleChange}
      onValidate={onFormValidate}
    >
      <FormField label="Nama" name="name" required>
        <TextInput name="name" />
      </FormField>
      <FormField
        validate={[
          validateIfNegativeNum,
        ]}
        label="Stok"
        name="stock"
        required
      >
        <TextInput name="stock" type="number" />
      </FormField>
      <FormField
        validate={[
          validateIfNegativeNum,
        ]}
        label="Harga Beli"
        name="costPrice"
        required
      >
        <TextInput name="costPrice" type="number" />
      </FormField>
      <FormField
        validate={[
          validateIfNegativeNum,
        ]}
        label="Harga Jual"
        name="sellingPrice"
        required
      >
        <TextInput name="sellingPrice" type="number" />
      </FormField>
      <FormField
        label="Gambar"
        help="Ukuran tidak boleh melebihi 100kb"
        error={fileError}
      >
        <FileInput
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </FormField>
      <Button
        type="submit"
        label="Submit"
        primary
        disabled={isSubmitBtnDisabled()}
      />
    </Form>
  );
};

ProductForm.defaultProps = {
  initialValue: {
    name: '',
    stock: '',
    costPrice: '',
    sellingPrice: '',
  },
};

ProductForm.propTypes = {
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

export default ProductForm;
