import React from 'react';

import PropTypes from 'prop-types';

// material
import {
  Select,
  TextField,
  MenuItem,
  Autocomplete,
  Input,
  FormControl,
  InputLabel
} from '@material-ui/core';
// import DatePicker from '@material-ui/lab/DatePicker';

// rhf
import { Controller } from 'react-hook-form';
// mask
import { IMaskInput } from 'react-imask';

// Hook for getting prev props
// import usePrevious from './usePrevProps';

// const getHelperText = (touched = false, error = '') => (touched && error ? error : '');
// const dumbFunc = () => {};

// For autocomplete
const getOptionLabel = ({ label }) => label;

export const RHFTextField = ({ error, name, control, defaultValue, ...rest }) => (
  <Controller
    defaultValue={defaultValue}
    render={({ field }) => (
      <TextField variant="standard" size="small" {...rest} {...field} error={error} />
    )}
    name={name}
    control={control}
  />
);

RHFTextField.propTypes = {
  error: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  defaultValue: PropTypes.object,
  rest: PropTypes.object
};

// Mask

const CustomMask = React.forwardRef((props, ref) => {
  const { onChange, mask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      // definitions={{
      //   '#': definitions
      // }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

CustomMask.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

// НОМЕР ТЕЛЕФОНА

export const RHFPhoneField = ({ error, name, control, label, defaultValue, ...rest }) => (
  <Controller
    render={({ field }) => (
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
        <Input
          {...rest}
          {...field}
          error={error}
          inputComponent={CustomMask}
          inputProps={{
            mask: '+7 (000) 000-0000'
          }}
        />
      </FormControl>
    )}
    name={name}
    control={control}
    defaultValue={defaultValue}
  />
);

RHFTextField.propTypes = {
  error: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  mask: PropTypes.object,
  rest: PropTypes.object
};

export const RHFSelect = ({ options = [], value, error, name, control, change, ...rest }) => (
  <Controller
    render={({ field }) => (
      <Select
        {...rest}
        field={field}
        options={options}
        placeholder="Выбрать"
        error={error}
        defaultValue={value}
        onChange={(e) => field.onChange(e.target.value ?? '')}
      >
        {options.map(({ label, value }) => (
          <MenuItem value={value} key={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    )}
    defaultValue={value}
    name={name}
    control={control}
  />
);

RHFSelect.propTypes = {
  options: PropTypes.array,
  error: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  rest: PropTypes.object
};

export const RHFSelectEvent = ({ options = [], error, name, control, change, ...rest }) => (
  <Controller
    render={({ field }) => (
      <Select
        {...rest}
        field={field}
        options={options}
        placeholder="Выбрать"
        error={error}
        defaultValue=""
        onChange={(e) => {
          field.onChange(e.target.value ?? '');
          change(e);
        }}
      >
        {options.map(({ label, value }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    )}
    name={name}
    control={control}
  />
);

RHFSelectEvent.propTypes = {
  options: PropTypes.array,
  error: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  rest: PropTypes.object
};

export const RHFDatePicker = ({ error, name, label, control, defaultValue, variant, ...rest }) => (
  <Controller
    defaultValue={defaultValue}
    render={({ field }) => (
      <TextField
        {...rest}
        {...field}
        type="date"
        label={label}
        variant={variant}
        error={error}
        InputLabelProps={{
          shrink: true
        }}
      />
    )}
    name={name}
    control={control}
  />
);

RHFDatePicker.propTypes = {
  error: PropTypes.bool,
  defaultValue: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  rest: PropTypes.object,
  variant: PropTypes.string,
  label: PropTypes.string
};

export const RHFAutocomplete = ({
  options = [],
  error,
  name,
  control,
  variant,
  label,
  ...rest
}) => (
  <Controller
    render={({ field }) => (
      <Autocomplete
        {...rest}
        field={field}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField {...params} label={label} variant={variant} error={error} />
        )}
        onChange={(_, data) => field.onChange(data ?? {})}
      />
    )}
    name={name}
    control={control}
  />
);

RHFAutocomplete.propTypes = {
  options: PropTypes.array,
  error: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  mask: PropTypes.object,
  rest: PropTypes.object,
  variant: PropTypes.string,
  label: PropTypes.string
};
RHFPhoneField.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.array,
  error: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
  mask: PropTypes.object,
  rest: PropTypes.object,
  variant: PropTypes.string,
  label: PropTypes.string
};

// GARBAGE

// <Controller
//   control={control}
//   name={name}
//   render={({ field }) => (
//     <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
//       <DatePicker
//         {...field}
//         label={label}
//         onChange={(date) => {
//           console.log(typeof date, 'Invalid Date');

//           if (date === 'Invalid Date') {
//             console.log('qwe');
//           }
//           // field.onChange(fDate(date));
//         }}
//         inputFormat="dd.MM.yyyy"
//         renderInput={(params) => (
//           <TextField
//             {...rest}
//             {...params}
//             variant={variant}
//             error={error}
//             helperText={null}
//             inputProps={{ ...params.inputProps, value: field.value, placeholder: 'дд.мм.гггг' }}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   )}
// />
