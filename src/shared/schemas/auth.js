import * as Yup from 'yup';

const commonFieldsSchema = {
  email: Yup.string()
    .email()
    .required('Email is required')
    .test('email', 'Please enter a valid email address.', (value) => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
  password: Yup.string()
    .required('Password is required')
    .min(
      8,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    )
    .matches(
      /[A-Z]/,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .matches(
      /^[a-zA-Z\s]*$/,
      'Name cannot contain special characters or numbers'
    )
    .required('Name is required'),
};

export const loginUserSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const registerUserSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
  password: commonFieldsSchema.password,
  confirmPassword: commonFieldsSchema.confirmPassword,
  name: commonFieldsSchema.name,
});
