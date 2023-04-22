import React from 'react';
// material
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
// components
import StatCard from 'components/StatCard';

// ----------------------------------------------------------------------

export default function Earnings() {
  const dataArray = [
    {
      label: 'Заказов на доставку/час',
      value: 0,
      valueLastWeek: 0,
      growth: 11,
      type: 'count',
      showGrowth: true
    },
    {
      label: 'Сервисное время',
      value: '0:00',
      valueLastWeek: '0:00',
      growth: 11,
      type: 'time',
      showGrowth: true
    },
    {
      label: 'Время доставки',
      value: '0',
      valueLastWeek: '0',
      growth: 11,
      type: 'time',
      showGrowth: true
    },
    {
      label: 'Средний чек',
      value: 0,
      valueLastWeek: 0,
      growth: 11,
      type: 'cash',
      showGrowth: true
    }
  ];
  return (
    <Card>
      <CardHeader title="Доставка" />
      <CardContent>
        <Grid container spacing={2}>
          {dataArray.map((item) => (
            <Grid item xs={12} sm={3} key={item.label}>
              <StatCard {...item} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
