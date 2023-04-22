import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Divider,
  Stack,
  Grid,
  Card,
  Paper,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';
// utils
import { fCurrency } from 'utils/formatNumber';

import ProgressBar from './ProgressBar';

// ----------------------------------------------------------------------

const SiteItem = ({ name, value }) => (
  <Grid item xs={6}>
    <Paper variant="outlined" sx={{ py: 0.5, textAlign: 'center' }}>
      <Typography variant="h6">{fCurrency(value)}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {name}
      </Typography>
    </Paper>
  </Grid>
);

SiteItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number
};

export default function Earnings() {
  const [data] = useState({
    total: 2000000,
    totalLastWeek: 0,
    cashbox: 0,
    cashboxLastWeek: 0,
    delivery: 0,
    deliveryLastWeek: 12
  });

  //
  const { total, totalLastWeek } = data;

  return (
    <Card>
      <CardHeader title="Выручка" />
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {fCurrency(total)}
        </Typography>
        <Stack>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            {fCurrency(totalLastWeek)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            неделю назад
          </Typography>
        </Stack>
        <Divider orientation="horizontal" sx={{ my: 2 }} />
        <ProgressBar maxValue={100} secondValue={50} label="Зал" />
        <Divider orientation="horizontal" sx={{ my: 2 }} />
        <ProgressBar maxValue={100} secondValue={50} label="Доставка" />
      </CardContent>
    </Card>
  );
}
