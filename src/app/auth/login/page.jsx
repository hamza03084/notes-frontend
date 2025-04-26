'use client';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginUserSchema} from '@/shared/schemas/auth';
import TextInput from '@/shared/components/inputs/textInput';
import PasswordInput from '@/shared/components/inputs/passwordInput';
import {
  Box,
  Button,
  Typography,
  Link,
  Paper,
  Container,
  CircularProgress,
} from '@mui/material';
import useApi from '@/shared/hooks/useApi';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    resolver: yupResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {callApi, loading} = useApi();

  const onSubmit = async (data) => {
    try {
      const result = await callApi({
        url: 'auth/login',
        method: 'POST',
        body: data,
      });
      toast.success(result?.message || 'Login successful!');
      if (result?.userInfo)
        localStorage.setItem('user', JSON.stringify(result.userInfo));

      router.push('/'); // Redirect to home page after successful login
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
      <Container maxWidth="sm" sx={{mt: 10}}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Login to your account below
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              placeholder="Enter your password"
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
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" underline="hover">
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
