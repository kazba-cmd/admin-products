import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, IconButton, Modal, Stack, Typography } from '@material-ui/core';
// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

//
const dummyFunc = () => {};

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  minHeight: 200,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.z24,
  outline: 'none',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    width: '70vw'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw'
  }
}));

ModalConfirm.propTypes = {
  label: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func
};

function ModalConfirm({
  label = '',
  confirmText = 'Да',
  cancelText = 'Нет',
  open = false,
  handleClose = dummyFunc,
  handleConfirm = dummyFunc
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <RootStyle>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <Icon icon={closeFill} width={20} height={20} />
          </IconButton>
        </Stack>
        <Stack direction="column" mt={1}>
          <Typography variant="h5" align="center">
            {label}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 6 }}>
            <Button variant="contained" onClick={handleConfirm}>
              {confirmText}
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              {cancelText}
            </Button>
          </Stack>
        </Stack>
      </RootStyle>
    </Modal>
  );
}
export default ModalConfirm;
