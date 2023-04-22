import * as React from 'react';
import { TreeItem, TreeView } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import { useEffect, useState } from 'react';
import { Button, Card, Container, Divider, Grid, Stack, Typography } from '@material-ui/core';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import personDeleteFill from '@iconify/icons-eva/person-delete-fill';
import creditCardOutline from '@iconify/icons-eva/credit-card-outline';
import deleteOutlined from '@iconify/icons-ant-design/delete-outlined';
import dollarCircleFilled from '@iconify/icons-ant-design/dollar-circle-filled';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TTInfo from './TTInfo';
import CategoryInfo from './CategoryInfo';
import DepartmentModal from './DepartmentModal';
import ModalConfirm from '../../ModalConfirm';
import AddUserModal from './Forms/AddUserModal';
import { DEP_URL, SSO_URL } from '../../../utils/constants';
import EditUser from './Forms/EditUser';
import InputCashIdModal from './Forms/InputCashIdModal';

export default function DepartmentStructure({
  org,
  deleteNode,
  addNode,
  addSpecialist,
  addUsers,
  addCash,
  positions,
  countries,
  subunitType,
  getAllStructure
}) {
  const [open, setOpen] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [currentNode, setCurrentNode] = useState('');
  const [openUser, setOpenUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [openCash, setOpenCash] = React.useState(false);
  const user = useSelector((state) => state.user);
  const handleOpen = (type) => {
    if (type === 'OpenModal') setOpen(true);
    if (type === 'OpenUser') setOpenUser(true);
    if (type === 'OpenCash') setOpenCash(true);
    if (type === 'OpenCancel') setOpenCancel(true);
    if (type === 'OpenEdit') setEditUser(true);
  };
  const handleClose = (type) => {
    if (type === 'OpenModal') setOpen(false);
    if (type === 'OpenUser') setOpenUser(false);
    if (type === 'OpenCash') setOpenCash(false);
    if (type === 'OpenCancel') setOpenCancel(false);
    if (type === 'OpenEdit') setEditUser(false);
  };
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.title}
      onClick={() => setCurrentNode(nodes)}
    >
      {console.log(nodes)}
      {Array.isArray(nodes.childrenNodes)
        ? nodes.childrenNodes.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  const updateCurrentNodes = async (id) => {
    const response = await axios.get(`${DEP_URL}/node/${id}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
    setCurrentNode(response.data);
    getAllStructure();
  };
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5} md={5}>
          <DepartmentModal
            open={open}
            handleClose={() => handleClose('OpenModal')}
            type={currentNode}
            addNode={addNode}
            addSpecialist={addSpecialist}
            positions={positions}
            countries={countries}
            subunitType={subunitType}
          />
          <ModalConfirm
            label="Вы действительно хотите удалить?"
            open={openCancel}
            handleClose={() => handleClose('OpenCancel')}
            handleConfirm={() => {
              deleteNode(currentNode.id);
              handleClose('OpenCancel');
            }}
          />
          <AddUserModal
            open={openUser}
            handleClose={() => handleClose('OpenUser')}
            addUser={addUsers}
            node={currentNode}
            updateCurrentNode={updateCurrentNodes}
            getAllStructure={getAllStructure}
          />
          <InputCashIdModal
            open={openCash}
            handleClose={() => handleClose('OpenCash')}
            addCash={addCash}
            node={currentNode}
            updateCurrentNode={updateCurrentNodes}
            getAllStructure={getAllStructure}
          />
          <EditUser open={editUser} handleClose={() => handleClose('OpenEdit')} />
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<Icon icon={minusFill} />}
            defaultExpanded={['root']}
            defaultExpandIcon={<Icon icon={plusFill} />}
            sx={{ flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}
          >
            {renderTree(org)}
          </TreeView>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Stack>
            {currentNode.subunitType?.key === 'SELLING_POINT' && (
              <Stack mt={1}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    sx={{ boxShadow: 'none' }}
                    onClick={() => handleOpen('OpenModal')}
                    title="Добавление"
                  >
                    <Icon icon={plusFill} height={25} width={25} />
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ boxShadow: 'none' }}
                    title="Редактирование"
                    onClick={() => handleOpen('OpenEdit')}
                  >
                    <Icon icon={creditCardOutline} height={25} width={25} />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ boxShadow: 'none' }}
                    onClick={() => {
                      handleOpen('OpenCancel');
                    }}
                    title="Удаление"
                  >
                    <Icon icon={deleteOutlined} height={25} width={25} />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    sx={{ boxShadow: 'none', bgcolor: '#ccc', color: 'white' }}
                    onClick={() => handleOpen('OpenCash')}
                    title="Касса"
                  >
                    <Icon icon={dollarCircleFilled} height={25} width={25} />
                  </Button>
                </Stack>
                <Typography variant="subtitle2">Подразделение: {currentNode.title}</Typography>
                <Typography variant="subtitle2">Страна: {currentNode.country?.name}</Typography>
                {console.log(currentNode)}
                <TTInfo info={currentNode.childrenNodes} />
              </Stack>
            )}
            {console.log(currentNode)}
            {currentNode.subunitType?.key === 'COMPANY' && (
              <Stack mt={1}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    sx={{ boxShadow: 'none' }}
                    onClick={() => handleOpen('OpenModal')}
                    title="Добавление"
                  >
                    <Icon icon={plusFill} height={25} width={25} />
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ boxShadow: 'none' }}
                    title="Редактирование"
                    onClick={() => handleOpen('OpenEdit')}
                  >
                    <Icon icon={creditCardOutline} height={25} width={25} />
                  </Button>
                </Stack>
                <Typography variant="subtitle2">Подразделение: {currentNode.title}</Typography>
              </Stack>
            )}
            {currentNode.nodeType?.key === 'SPECIALIST' && (
              <Stack mt={1}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    sx={{ boxShadow: 'none' }}
                    onClick={() => {
                      handleOpen('OpenUser');
                    }}
                    title="Добавление"
                  >
                    <Icon icon={personAddFill} height={25} width={25} />
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ boxShadow: 'none' }}
                    title="Редактирование"
                    onClick={() => {
                      handleOpen('OpenEdit');
                    }}
                  >
                    <Icon icon={creditCardOutline} height={25} width={25} />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ boxShadow: 'none' }}
                    onClick={() => {
                      handleOpen('OpenCancel');
                    }}
                    title="Удаление"
                  >
                    <Icon icon={personDeleteFill} height={25} width={25} />
                  </Button>
                </Stack>
                <Typography variant="subtitle2">Специальность: {currentNode.title}</Typography>
                <CategoryInfo node={currentNode} updateCurrentNodes={updateCurrentNodes} />
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
