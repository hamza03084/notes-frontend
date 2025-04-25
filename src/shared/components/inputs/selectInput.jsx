import {useId} from 'react';
import {Controller} from 'react-hook-form';
import Select from 'react-select';
import {FormControl, InputLabel, FormHelperText} from '@mui/material';

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? '#3f51b5' : base.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #3f51b5' : base.boxShadow,
    '&:hover': {
      borderColor: '#3f51b5',
    },
    minHeight: 40,
    fontSize: 14,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? '#e3f2fd'
      : state.isSelected
      ? '#bbdefb'
      : 'white',
    color: 'black',
    fontSize: 14,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999, // so it floats above dialogs, etc.
  }),
};

const SelectInput = ({
  label,
  options,
  control,
  name,
  placeholder = 'Select a Type',
  ...rest
}) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}, fieldState: {error}}) => (
        <FormControl fullWidth margin="normal" error={!!error}>
          {label && (
            <InputLabel shrink htmlFor={id}>
              {label}
            </InputLabel>
          )}
          <Select
            inputId={id}
            instanceId={id}
            value={options?.find((option) => option.value === value) || null}
            onChange={(selectedOption) => onChange(selectedOption?.value)}
            options={options}
            placeholder={placeholder}
            styles={customStyles}
            {...rest}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default SelectInput;
