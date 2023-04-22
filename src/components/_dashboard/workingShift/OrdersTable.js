import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fCurrency } from 'utils/formatNumber';

const StyledTableCell = styled(TableCell)(({ isheader }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: isheader ? 600 : ''
  }
}));

const StyledTableRow = styled(TableRow)(({ theme, ...props }) => ({
  backgroundColor: props.isheader ? theme.palette.action.hover : '',
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function createData(label, amount, summ, cash, card, online, isheader) {
  return {
    label,
    amount,
    summ,
    cash,
    card,
    online,
    isheader
  };
}

const rows = [
  createData('Доставка', 0, 0, 0, 0, 0, true),
  createData('Доставка', 0, 0, 0, 0, 0, false),
  createData('Самовывоз', 0, 0, 0, 0, 0, false),
  createData('Отменено', 0, 0, 0, 0, 0, false),
  createData('Зал', 0, 0, 0, 0, 0, true),
  createData('Зал', 0, 0, 0, 0, 0, false),
  createData('Отменено', 0, 0, 0, 0, 0, false)
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="right">Кол-во заказов</StyledTableCell>
            <StyledTableCell align="right">Сумма</StyledTableCell>
            <StyledTableCell align="right">Наличные</StyledTableCell>
            <StyledTableCell align="right">Карта</StyledTableCell>
            <StyledTableCell align="right">Онлайн</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ label, amount, summ, cash, card, online, isheader }, i) => (
            <StyledTableRow key={i} isheader={isheader ? 1 : 0}>
              <StyledTableCell isheader={isheader ? 1 : 0}>{label}</StyledTableCell>
              <StyledTableCell align="right">{fCurrency(amount)}</StyledTableCell>
              <StyledTableCell align="right">{fCurrency(summ)}</StyledTableCell>
              <StyledTableCell align="right">{cash}</StyledTableCell>
              <StyledTableCell align="right">{card}</StyledTableCell>
              <StyledTableCell align="right">{online}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
