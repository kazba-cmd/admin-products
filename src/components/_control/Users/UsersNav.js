import { Stack, Button, TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import UsersModal from './UsersModal';

// ----------------------------------------------------------------------

function UsersNav({ addUser, currentUser, isOpen }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack direction="row" spacing={5} justifyContent="space-between">
      <UsersModal
        open={isOpen || open}
        onClose={handleClose}
        onAdd={addUser}
        currentUser={currentUser}
      />
      <Button variant="contained" color="info" onClick={handleOpen}>
        Добавить нового пользователя
      </Button>
      <TextField label="Поиск" size="small" />
    </Stack>
  );
}

export default UsersNav;
UsersNav.propTypes = {
  addUser: PropTypes.array,
  currentUser: PropTypes.array,
  isOpen: PropTypes.array
};
