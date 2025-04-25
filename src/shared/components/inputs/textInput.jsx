import React from 'react';
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';

const TextInput = ({control, name, label, placeholder, disabled = false}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          error={!!error}
          helperText={error ? error.message : ''}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

export default TextInput;
