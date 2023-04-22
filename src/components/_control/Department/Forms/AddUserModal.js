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

function AddUserModal({ open, handleClose, addUser, node, updateCurrentNode, getAllStructure }) {
  const [currentUser, setCurrentUser] = useState('');
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const onSubmit = async () => {
    console.log(currentUser);
    await axios.post(`${DEP_URL}/node/${node.id}/user/${currentUser}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
    updateCurrentNode(node.id);
    callbackClose();
  };
  const callbackClose = () => {
    handleClose();
  };
  const getAllUsers = () =>
    axios.get(`${SSO_URL}/user`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
  const init = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    init();
  }, []);
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
            <Select size="small" onChange={(e) => setCurrentUser(e.target.value)}>
              {users.map((row) => (
                <MenuItem value={row.id}>
                  {row.surname} {row.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack>
            <Button type="submit" variant="contained" onClick={onSubmit}>
              Добавить
            </Button>
          </Stack>
        </Stack>
      </RootStyle>
    </Modal>
  );
}
export default AddUserModal;
