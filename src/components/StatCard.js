import React from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Paper, Typography, Divider, Chip } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// utils
import { fCurrency, fPercent, fNumber } from 'utils/formatNumber';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1)
}));

const getFormattedValue = (type, value) => {
  switch (type) {
    case 'time':
      return value;
    case 'cash':
      return fCurrency(value);
    case 'count':
      return fNumber(value);

    default:
      return value;
  }
};

const StatCard = ({ label, value, valueLastWeek, growth, type, showGrowth }) => (
  <Paper variant="outlined" sx={{ p: 1 }}>
    <LabelStyle>{label}</LabelStyle>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography sx={{ fontWeight: 500 }}>{getFormattedValue(type, value)}</Typography>

      {showGrowth && (
        <Chip
          label={fPercent(growth)}
          color={growth > -1 ? 'primary' : 'error'}
          sx={{ p: 0 }}
          size="small"
        />
      )}
    </Stack>
    <Divider sx={{ my: 1 }} />

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {getFormattedValue(type, valueLastWeek)} неделю назад
    </Typography>
  </Paper>
);

StatCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  valueLastWeek: PropTypes.any,
  growth: PropTypes.number,
  type: PropTypes.string,
  showGrowth: PropTypes.bool
};

export default StatCard;
