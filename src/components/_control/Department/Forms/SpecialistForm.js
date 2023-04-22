import React from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, Select, Stack, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';

export default function SpecialistForm({ close, addSpecialist, node, positions }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addSpecialist(data, node.id);
    close();
  };
  return (
    <Stack direction="column" spacing={5}>
      <Stack justifyContent="space-between" direction="row">
        <Stack mt={3} justifyContent="column" spacing={3.3}>
          <Typography>Название должности:</Typography>
          <Typography>Должность:</Typography>
          <Typography>Подразделение:</Typography>
        </Stack>
        <form>
          <Stack mt={3} justifyContent="column" spacing={1}>
            <TextField variant="outlined" size="small" {...register('title')} />
            <Select size="small" {...register('position')}>
              {positions.map((row) => (
                <MenuItem value={row.name} key={row.name}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
            <TextField variant="outlined" size="small" value={node.title} />
          </Stack>
        </form>
      </Stack>

      <Stack mt={7} direction="row" justifyContent="space-around">
        <Button variant="contained" size="large" onClick={handleSubmit((data) => onSubmit(data))}>
          Добавить
        </Button>
        <Button variant="contained" color="error" size="large" onClick={close}>
          Назад
        </Button>
      </Stack>
    </Stack>
  );
}
SpecialistForm.propTypes = {
  close: PropTypes.array,
  addSpecialist: PropTypes.array,
  node: PropTypes.array,
  positions: PropTypes.array,
  user: PropTypes.array
};
