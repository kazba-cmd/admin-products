// material
import {
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Table,
  TableBody,
  ListItem,
  ListItemText,
  Button,
  Icon,
  IconButton
} from '@material-ui/core';

// components
import React, { useState } from 'react';
import minusFill from '@iconify/icons-eva/minus-fill';
import deleteOutlined from '@iconify/icons-ant-design/delete-outlined';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TableHeadTemplate from '../../TableHeadTemplate';
import ModalConfirm from '../../ModalConfirm';
import { DEP_URL } from '../../../utils/constants';
// ----------------------------------------------------------------------
const head = [
  {
    id: 'state',
    label: 'ФИО',
    alignRight: false
  },
  {
    id: 'option',
    label: '',
    alignRight: false
  }
];

export default function CategoryInfo({ node, updateCurrentNodes }) {
  const [currentUser, setCurrentUser] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state.user);
  const deleteNode = async () => {
    await axios.delete(`${DEP_URL}/node/${node.id}/user/${currentUser}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
    updateCurrentNodes(node.id);
    handleClose();
  };
  console.log(node);
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <ModalConfirm
        label="Вы действительно хотите удалить?"
        open={open}
        handleClose={handleClose}
        handleConfirm={deleteNode}
      />
      <Table size="small">
        <TableHeadTemplate headList={head} />
        <TableBody>
          {console.log(node)}
          {node.users?.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" scope="row">
                {row.name} {row.surname}
              </TableCell>
              <TableCell align="right" scope="row">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setCurrentUser(row.id);
                    handleOpen();
                  }}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
