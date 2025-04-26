import {useId} from 'react';
import {Controller} from 'react-hook-form';
import Select from 'react-select';
import {FormControl, FormHelperText} from '@mui/material';

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? '#3f51b5' : base.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #3f51b5' : base.boxShadow,
    '&:hover': {
      borderColor: '#3f51b5',
    },
    minHeight: 56, // match MUI TextField height
    fontSize: 16,
    paddingLeft: 2,
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
      render={({field: {value, onChange}, fieldState: {error}}) => {
        // For multi-select, find all options that match the values in the array
        // For single-select, find the option that matches the value
        const selectedOption = rest?.isMulti
          ? options?.filter((option) => value?.includes(option.value))
          : options?.find((option) => option.value === value);

        return (
          <FormControl fullWidth margin="normal">
            {label && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                  marginBottom: 4,
                  marginLeft: 2,
                }}
              >
                {label}
              </div>
            )}
            <Select
              instanceId={id}
              value={selectedOption}
              onChange={(selectedOption) => {
                if (rest?.isMulti) {
                  // For multi-select, extract an array of values
                  onChange(
                    selectedOption
                      ? selectedOption.map((item) => item.value)
                      : []
                  );
                } else {
                  // For single-select, extract the single value
                  onChange(selectedOption?.value);
                }
              }}
              options={options}
              placeholder={placeholder}
              styles={customStyles}
              {...rest}
            />
            {error && (
              <FormHelperText error style={{marginLeft: 2}}>
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default SelectInput;
