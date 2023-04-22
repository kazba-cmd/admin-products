// material
import {
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Table,
  TableBody,
  ListItem,
  ListItemText
} from '@material-ui/core';

// components
import React from 'react';
import TableHeadTemplate from '../../TableHeadTemplate';
// ----------------------------------------------------------------------
const head = [
  {
    id: 'state',
    label: 'Должность',
    alignRight: false
  },
  {
    id: 'code',
    label: 'Шифр',
    alignRight: false
  },
  {
    id: 'necessary',
    label: 'Необходимое количество штатных единиц',
    alignRight: false
  },
  {
    id: 'number',
    label: 'Количество штатных единиц',
    alignRight: false
  },
  {
    id: 'vacancy',
    label: 'Количество вакансий',
    alignRight: false
  }
];

const rows = [
  {
    state: 'Менеджер',
    coder: 0,
    num: 0,
    number: 0,
    vacancy: 0
  }
];

export default function TTInfo({ info }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHeadTemplate headList={head} />
        <TableBody>
          {info?.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left" scope="row">
                {row.coder}
              </TableCell>
              <TableCell align="left" scope="row">
                {row.num}
              </TableCell>
              <TableCell align="left" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="left" scope="row">
                {row.vacancy}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
