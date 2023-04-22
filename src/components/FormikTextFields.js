// ЕБАНАЯ ХУЙНЯ RHF ЛУЧШЕ
import React, { memo } from 'react';

import PropTypes from 'prop-types';

// material
import { TextField, MenuItem, Autocomplete } from '@material-ui/core';
import { getIn } from 'formik';

// Hook for getting prev props
// import usePrevious from './usePrevProps';

// const getHelperText = (touched = false, error = '') => (touched && error ? error : '');

const dumbFunc = () => {};

export const FormikTextField = memo(
  ({ touched, errors, handleChange = dumbFunc, name, label, value }) => {
    const isTouched = getIn(touched, name);
    const error = getIn(errors, name);

    console.log('render', name);

    return (
      <TextField
        variant="standard"
        label={label}
        name={name}
        value={value}
        error={Boolean(isTouched && error)}
        onChange={handleChange}
      />
    );
  }
);

FormikTextField.propTypes = {
  touched: PropTypes.any,
  errors: PropTypes.any,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes?.string,
  value: PropTypes.any
};

export const FormikSelectField = memo((props) => {
  const { touched, errors, handleChange = dumbFunc, name, label, value, options = [] } = props;

  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);

  console.log('render', name);

  return (
    <>
      <TextField
        variant="standard"
        label={label}
        name={name}
        value={value}
        error={Boolean(isTouched && error)}
        onChange={handleChange}
        select
        fullWidth
      >
        {options.map((_, i) => (
          <MenuItem value={i} key={i}>
            Жай {i}
          </MenuItem>
        ))}
      </TextField>
      {/* <pre>{JSON.stringify(prevProps, null, 2)}</pre>
      <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </>
  );
});

FormikSelectField.propTypes = {
  touched: PropTypes.any,
  errors: PropTypes.any,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes?.string,
  value: PropTypes.any,
  options: PropTypes.array
};

export const FormikAutocompleteField = memo((props) => {
  const { touched, errors, name, setFieldValue, options = [] } = props;

  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);

  const getOptionLabel = ({ label }) => label;

  console.log('render', name);

  const handleAutoComplete = (_, value) => {
    setFieldValue(name, value);
  };

  return (
    <Autocomplete
      options={options}
      name={name}
      getOptionLabel={getOptionLabel}
      sx={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" error={Boolean(isTouched && error?.label)} />
      )}
      onChange={handleAutoComplete}
    />
  );
});

FormikAutocompleteField.propTypes = {
  touched: PropTypes.any,
  // error: PropTypes.any,
  setFieldValue: PropTypes.func,
  errors: PropTypes.any,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes?.string,
  value: PropTypes.any,
  options: PropTypes.array
};
