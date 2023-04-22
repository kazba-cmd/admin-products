import React from 'react';
// material
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
//
import StatCard from 'components/StatCard';
// ----------------------------------------------------------------------

export default function Earnings() {
  const dataArray = [
    {
      label: 'Выручка на чел. в час',
      value: '0',
      valueLastWeek: '0',
      type: 'cash',
      showGrowth: false
    },
    {
      label: 'Продук. на чел. в час',
      value: '0:00',
      valueLastWeek: '0:00',
      type: 'count',
      showGrowth: false
    },
    {
      label: 'Время приготовление',
      value: '00:00',
      valueLastWeek: '00:00',
      type: 'time',
      showGrowth: false
    }
  ];

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader title="Кухня" />
      <CardContent>
        <Grid container spacing={2}>
          {dataArray.map((item) => (
            <Grid item xs={12} sm={4} key={item.label}>
              <StatCard {...item} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
