import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Select, Stack, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

export default function SubunitForm({ close, node, countries, addNode, positions, subunitType }) {
  const [option, setOption] = useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addNode(data, node.id);
    close();
  };
  console.log(option);
  useEffect(() => {}, [option]);
  return (
    <Stack direction="column" spacing={5}>
      <Stack justifyContent="space-between" direction="row">
        <Stack mt={3} justifyContent="column" spacing={4.5}>
          <Typography>Название:</Typography>
          <Typography>Тип подразделения:</Typography>
          <Typography>Родительское подразделение:</Typography>
          <Typography>Название должности:</Typography>
          <Typography>Страна:</Typography>
        </Stack>
        <form>
          <Stack mt={3} justifyContent="column" spacing={2}>
            <TextField variant="outlined" size="small" {...register('title')} />
            <Select
              size="small"
              {...register('subunitType')}
              onChange={(e) => setOption(e.target.value)}
            >
              {subunitType.map((row) => (
                <MenuItem value={row.key} key={row.key}>
                  {row.value}
                </MenuItem>
              ))}
            </Select>
            <TextField size="small" value={node.title} />
            <Select size="small" {...register('position')}>
              {positions.map((row) => (
                <MenuItem value={row.name} key={row.name}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
            <Select {...register('country')} size="small">
              {countries.map((row) => (
                <MenuItem value={row.id} key={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </form>
      </Stack>
      <Stack direction="row" justifyContent="space-around">
        <Button
          variant="contained"
          size="large"
          type="submit"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Добавить
        </Button>
        <Button variant="contained" color="error" size="large" onClick={close}>
          Назад
        </Button>
      </Stack>
    </Stack>
  );
}
SubunitForm.propTypes = {
  close: PropTypes.array,
  node: PropTypes.array,
  addNode: PropTypes.array,
  positions: PropTypes.array,
  subunitType: PropTypes.array
};
