import React, { useState, useEffect } from 'react';
// material
import {
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Table,
  TableBody,
  IconButton,
  Typography,
  Stack,
  Button,
  TextField
} from '@material-ui/core';
import axios from 'axios';
// components
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import edit2Outline from '@iconify/icons-eva/edit-2-outline';
import { useSelector } from 'react-redux';
import { SSO_URL } from '../../../utils/constants';
import UsersHead from './UsersHead';
import UsersModal from './UsersModal';
// ----------------------------------------------------------------------

function UsersContainer() {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentUser({});
  };
  //
  // const createUser = () => {
  //
  //   headers: {
  //     Authorization: `Bearer ${user.authTokenInfo.access_token}`
  //   }
  // }
  const editUser = async (data) => {
    setCurrentUser({});
    await axios.put(
      `${SSO_URL}/user`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${user.authTokenInfo.access_token}`
        }
      }
    );
    init();
  };

  const deleteUser = async (userID) => {
    await axios.delete(`${SSO_URL}/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
    init();
  };
  const getAllUsers = () =>
    axios.get(`${SSO_URL}/user`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });

  const createUser = async (data) => {
    await axios.post(
      `${SSO_URL}/user`,
      {
        username: data.username,
        name: data.name,
        surname: data.surname,
        password: data.password,
        phone: data.phone,
        birthDay: data.birthDay,
        roles: [
          {
            id: data.role
          }
        ],
        enabled: true
      },
      {
        headers: {
          Authorization: `Bearer ${user.authTokenInfo.access_token}`
        }
      }
    );
    init();
  };
  const init = async () => {
    const response = await getAllUsers();
    // Иногда сука null
    setUsers(response.data);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Stack direction="column" spacing={5} sx={{ mb: 5 }} justifyContent="space-between">
        <Typography variant="h4">Пользователи</Typography>
        <Stack direction="row" spacing={5} justifyContent="space-between">
          <UsersModal
            open={open}
            onClose={handleClose}
            onAdd={createUser}
            currentUser={currentUser}
            editUser={editUser}
          />
          <Button variant="contained" color="info" onClick={handleOpen}>
            Добавить нового пользователя
          </Button>
          <TextField label="Поиск" size="small" />
        </Stack>
      </Stack>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <UsersHead />
          <TableBody>
            {users.map((users) => (
              <TableRow key={users.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" component="th" scope="row">
                  {users.username}
                </TableCell>
                <TableCell align="left">{users.name}</TableCell>
                <TableCell align="left">{users.surname}</TableCell>
                {/* <TableCell align="left">{users.patronymic}</TableCell> */}
                <TableCell align="left">{users.phone}</TableCell>
                <TableCell align="left">{users.enabled === true ? 'Имеет' : 'Не имеет'}</TableCell>
                {/* <TableCell align="left">{users.roles.map((role) => ` ${role.name}`)}</TableCell> */}
                <TableCell align="left">
                  <IconButton
                    onClick={() => {
                      setCurrentUser(users);
                      setOpen(true);
                    }}
                  >
                    <Icon icon={edit2Outline} width={20} height={20} />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => deleteUser(users.id)}>
                    <Icon icon={trash2Outline} color="red" width={20} height={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UsersContainer;
