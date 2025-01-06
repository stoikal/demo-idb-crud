import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, FormField, TextInput, Button, FileInput } from 'grommet';
import noop from '../utils/noop';

function ProductForm({ initialValue, onSubmit }) {
  const [value, setValue] = useState(initialValue);
  const [imageFile, setImageFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const fileInputRef = useRef();

  const handleChange = (nextValue) => {
    setValue(nextValue);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const file = fileList[0];

    if (file.size > 20_000) {
      setFileError('Ukuran berkas melebihi 100kb');
      setImageFile(null);
    } else {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const base64Str = e.target.result;
        setFileError(null);
        setImageFile(base64Str);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    const submitValue = {
      ...event.value,
      image: imageFile,
    };
    onSubmit(submitValue);
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

  const isNameInputDisabled = !!initialValue.name;

  return (
    <Form
      value={value}
      validate="change"
      onSubmit={handleSubmit}
      onChange={handleChange}
      onValidate={onFormValidate}
    >
      <FormField label="Nama" name="name" required disabled={isNameInputDisabled}>
        <TextInput name="name" disabled={isNameInputDisabled} />
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
        label="Simpan"
        primary
        disabled={isSubmitBtnDisabled()}
      />
    </Form>
  );
}

ProductForm.defaultProps = {
  initialValue: {
    name: '',
    stock: '',
    costPrice: '',
    sellingPrice: '',
  },
  onSubmit: noop,
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
  onSubmit: PropTypes.func,
};

export default ProductForm;
