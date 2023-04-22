import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Stack, Box, Typography } from '@material-ui/core';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}, &.${linearProgressClasses.colorSecondary} `]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10
  }
}));

ProgressBar.propTypes = {
  maxValue: PropTypes.number,
  secondValue: PropTypes.number,
  label: PropTypes.string
};

export default function ProgressBar({ label = '', maxValue = 0, secondValue = 0 }) {
  const secondPercentage = (secondValue * 100) / maxValue;
  return (
    <Stack spacing={1}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography>{label}</Typography>
          <Typography>{maxValue} тг</Typography>
        </Stack>

        <BorderLinearProgress variant="determinate" value={maxValue} color="primary" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography>Неделю назад</Typography>
          <Typography>{secondValue} тг</Typography>
        </Stack>
        <BorderLinearProgress variant="determinate" value={secondPercentage} color="secondary" />
      </Box>
    </Stack>
  );
}
