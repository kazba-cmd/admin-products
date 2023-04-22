import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import qs from 'qs';

// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Button
} from '@material-ui/core';

import { SSO_URL } from 'utils/constants';

import { setUser } from 'features/user/userSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле')
  });

  const getAuthToken = async ({ username, password }) => {
    const data = qs.stringify({
      username,
      password,
      grant_type: 'password',
      client_id: 'amazon'
    });

    return axios.post(`${SSO_URL}/oauth/token`, data);
  };

  const getUserInfo = async (token) =>
    axios.get(`${SSO_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { data: authTokenInfo, status } = await getAuthToken(values);

      if (status === 200) {
        const { data: userInfo } = await getUserInfo(authTokenInfo.access_token);

        dispatch(
          setUser({
            authTokenInfo,
            userInfo
          })
        );
        navigate('/', { replace: true });
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="username"
              label="Логин"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 4 }}>
            Войти
          </Button>
        </Form>
      </FormikProvider>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Неверный логин или пароль
        </Alert>
      </Snackbar>
    </>
  );
}
