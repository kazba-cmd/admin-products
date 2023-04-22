import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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

function EditUser({ open, handleClose }) {
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
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="h6">Редактирование</Typography>
          </Stack>
          <Stack>
            <IconButton onClick={callbackClose}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>
        </Stack>
      </RootStyle>
    </Modal>
  );
}
export default EditUser;
