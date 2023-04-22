import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Stack, Button, IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SSO_URL } from '../../../utils/constants';
import { RHFDatePicker, RHFPhoneField, RHFTextField, RHFSelect } from '../../RHFFields';

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z24,
  outline: 'none',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    width: '70vw'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw'
  }
}));
export default function UsersModal({ open, onClose, onAdd, currentUser, editUser }) {
  const schema = yup.object({
    username: yup.string().required(),
    ...(currentUser.username ? { password: yup.string() } : { password: yup.string().required() }),
    name: yup.string().required(),
    surname: yup.string().required()
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const user = useSelector((state) => state.user);
  const { username, name, surname, phone, birthDay } = currentUser;
  const [roles, setRoles] = useState('');
  const callbackClose = () => {
    onClose();
    reset({});
  };
  const getRoles = async () => {
    const response = await axios
      .get(`${SSO_URL}/role`, {
        headers: {
          Authorization: `Bearer ${user.authTokenInfo.access_token}`
        }
      })
      .then((resp) => {
        setRoles(resp?.data.map((role) => ({ label: role.name, value: role.id })));
      });
  };
  useEffect(() => {
    getRoles();
  }, []);
  console.log(roles);
  return (
    <Modal
      open={open}
      onClose={callbackClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <RootStyle>
        <Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="h5">Добавление пользователя</Typography>
            <IconButton onClick={callbackClose}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="column" spacing={4} sx={{ mt: 2 }}>
              <Typography>Логин:</Typography>
              <Typography>Имя:</Typography>
              <Typography>Фамилия:</Typography>
              {/* <Typography>Отчество:</Typography> */}
              <Typography>Пароль:</Typography>
              <Typography>Телефон:</Typography>
              <Typography>Роль</Typography>
              <Typography>Дата рождения:</Typography>
            </Stack>
            <form>
              <Stack direction="column" spacing={3} sx={{ mt: 2 }}>
                <RHFTextField defaultValue={username || ''} name="username" control={control} />
                <RHFTextField defaultValue={name || ''} name="name" control={control} />
                <RHFTextField defaultValue={surname || ''} name="surname" control={control} />
                {/* <RHFTextField defaultValue={patronymic || ''} name="patronymic" control={control} /> */}
                <RHFTextField name="password" control={control} type="password" />
                <RHFPhoneField defaultValue={phone} name="phone" control={control} size="small" />
                <RHFSelect variant="standard" name="role" control={control} options={roles} />
                {/* <RHFTextField
                  defaultValue={medCardNumber || ''}
                  name="medCardNumber"
                  control={control}
                /> */}
                <RHFDatePicker
                  defaultValue={birthDay?.split('T')[0]}
                  name="birthDay"
                  control={control}
                  size="small"
                />
              </Stack>
            </form>
          </Stack>
          <Stack direction="row" justifyContent="space-around" sx={{ mt: 5 }}>
            {currentUser.username ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit((data) => {
                  editUser({ ...data, id: currentUser.id });
                  console.log(data);
                  callbackClose();
                  reset({});
                })}
              >
                Сохранить
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="info"
                size="large"
                onClick={handleSubmit((data) => {
                  console.log(data);
                  onAdd(data);
                  callbackClose();
                  reset({});
                })}
              >
                Добавить
              </Button>
            )}
            <Button variant="contained" color="error" size="large" onClick={callbackClose}>
              Отменить
            </Button>
          </Stack>
        </Stack>
      </RootStyle>
    </Modal>
  );
}
UsersModal.propTypes = {
  onClose: PropTypes.array,
  currentUser: PropTypes.array,
  editUser: PropTypes.array,
  open: PropTypes.array,
  onAdd: PropTypes.array
};
