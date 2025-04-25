import {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const PasswordInput = ({control, name, label, placeholder}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <FormControl fullWidth margin="normal" error={!!error}>
          {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
          <OutlinedInput
            {...field}
            id={name}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
