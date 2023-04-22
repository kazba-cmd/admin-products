import { Box, Button, IconButton, Modal, TextField, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DEP_URL, SSO_URL } from '../../../../utils/constants';

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
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

function InputCashIdModal({ open, handleClose, addCash, node, close }) {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addCash(data, node);
    callbackClose();
  };
  const callbackClose = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <RootStyle>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="h6">Добавление</Typography>
            </Stack>
            <Stack>
              <IconButton onClick={callbackClose}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack>
            <TextField placeholder="Введи что-нибудь" {...register('title')} />
          </Stack>
          <Stack>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit((data) => onSubmit(data))}
            >
              Добавить
            </Button>
          </Stack>
        </Stack>
      </RootStyle>
    </Modal>
  );
}
export default InputCashIdModal;
