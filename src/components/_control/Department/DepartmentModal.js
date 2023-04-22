import { Box, IconButton, MenuItem, Modal, Select, Stack, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { fCurrency } from '../../../utils/formatNumber';
import SubunitForm from './Forms/SubunitForm';
import SpecialistForm from './Forms/SpecialistForm';

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
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

DepartmentsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleClose: PropTypes.func
};

function DepartmentsModal({
  open,
  handleClose,
  type,
  countries,
  addNode,
  addSpecialist,
  positions,
  subunitType
}) {
  const [option, setOption] = React.useState('');
  const handleChange = (event) => {
    setOption(event.target.value);
  };
  const callbackClose = () => {
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <RootStyle>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="h6">Добавление</Typography>
            </Stack>
            <Stack>
              <IconButton onClick={callbackClose}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>
          </Stack>
          <Select value={option} onChange={handleChange}>
            <MenuItem value={1}>Подразделение</MenuItem>
            <MenuItem value={2}>Сотрудник</MenuItem>
          </Select>
          {option === 1 && (
            <SubunitForm
              close={handleClose}
              node={type}
              addNode={addNode}
              countries={countries}
              positions={positions}
              subunitType={subunitType}
            />
          )}
          {option === 2 && (
            <SpecialistForm
              close={handleClose}
              node={type}
              addSpecialist={addSpecialist}
              positions={positions}
            />
          )}
        </Stack>
      </RootStyle>
    </Modal>
  );
}
export default DepartmentsModal;
