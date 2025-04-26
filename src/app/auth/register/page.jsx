'use client';

import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerUserSchema} from '@/shared/schemas/auth';
import TextInput from '@/shared/components/inputs/textInput';
import PasswordInput from '@/shared/components/inputs/passwordInput';
import useApi from '@/shared/hooks/useApi';
import toast from 'react-hot-toast';

import {
  Box,
  Button,
  Typography,
  Link,
  Paper,
  Container,
  CircularProgress,
} from '@mui/material';

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    resolver: yupResolver(registerUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });

  const {callApi, loading} = useApi();

  const onSubmit = async (data) => {
    try {
      const result = await callApi({
        url: 'auth/register',
        method: 'POST',
        body: data,
      });
      toast.success(result?.message || 'Registration successful!');
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || 'Something went wrong';
      toast.error(errorMsg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Fill in your information below
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextInput
              name="name"
              control={control}
              label="Full Name"
              placeholder="Enter your full name"
            />
            <TextInput
              name="email"
              control={control}
              label="Email Address"
              placeholder="Enter your email"
            />
            <PasswordInput
              name="password"
              control={control}
              label="Password"
              placeholder="Create a password"
            />
            <PasswordInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              placeholder="Re-enter your password"
            />

            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || isSubmitting}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Box>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/auth/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
