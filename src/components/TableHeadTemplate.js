// material
import { visuallyHidden } from '@material-ui/utils';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';
import { dumbFunc } from 'utils/helpers';

// ----------------------------------------------------------------------

export default function TableHeadTemplate({
  headList = [],
  orderBy,
  order,
  onRequestSort = dumbFunc
}) {
  const createSortHandler = (property) => (event) => {
    // console.log(property, event);
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headList.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
