import React from 'react';
// material
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
//
import StatCard from 'components/StatCard';
// ----------------------------------------------------------------------

export default function Earnings() {
  const dataArray = [
    {
      label: 'Время приема заказа',
      value: '10:00',
      valueLastWeek: '0:00',
      growth: 11,
      type: 'time',
      showGrowth: true
    },
    {
      label: 'Время выдачи заказа',
      value: '0:00',
      valueLastWeek: '0:00',
      growth: 11,
      type: 'time',
      showGrowth: true
    },
    {
      label: 'Средний чек',
      value: '0',
      valueLastWeek: '0',
      growth: -12,
      type: 'cash',
      showGrowth: true
    }
  ];

  return (
    <Card>
      <CardHeader title="Зал" />
      <CardContent>
        <Grid container spacing={2}>
          {dataArray.map((item) => (
            <Grid item xs={12} sm={4} key={item.label}>
              <StatCard key={item.label} {...item} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
