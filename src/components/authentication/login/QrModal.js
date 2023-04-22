import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import QrReader from 'react-qr-reader';
//
import PropTypes from 'prop-types';
// material
import { Modal, Box } from '@material-ui/core';
//
import { setUser } from 'features/user/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  p: 4
};

QrModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

function QrModal({ open, handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const handleScan = (data) => {
    if (data) {
      const username = data.split(';')[0];
      const password = data.split(';')[1];
      if (username === 'test' && password === 'test') {
        dispatch(
          setUser({
            loggedUsers: [],
            currentUser: {
              authed: true,
              username,
              password
            }
          })
        );
        navigate('/');
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <QrReader delay={500} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
      </Box>
    </Modal>
  );
}

export default QrModal;
