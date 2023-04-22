// material
import { TableHead, TableRow, TableCell } from '@material-ui/core';

// components
import React from 'react';
// ----------------------------------------------------------------------

export default function UsersHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">Логин</TableCell>
        <TableCell align="left">Имя</TableCell>
        <TableCell align="left">Фамилия</TableCell>
        <TableCell align="left">Телефон</TableCell>
        <TableCell align="left">Имеет ли доступ</TableCell>
        <TableCell align="left">Редактирование</TableCell>
        <TableCell align="left">Удаление</TableCell>
        {/* <TableCell align="left">Роль</TableCell> */}
        <TableCell />
        <TableCell />
      </TableRow>
    </TableHead>
  );
}
