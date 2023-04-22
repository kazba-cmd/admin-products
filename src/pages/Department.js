import { Container, Typography } from '@material-ui/core';
import Page from 'components/Page';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DepartmentStructure from '../components/_control/Department/DepartmentStructure';
import { DEP_URL, REST_URL } from '../utils/constants';
// ----------------------------------------------------------------------

export default function Department() {
  const [structure, setStructure] = useState([]);
  const [positions, setPositions] = useState([]);
  const [subunitType, setSubunitType] = useState([]);
  const [countries, setCountries] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(countries);
  const getCountries = async () => {
    await axios.get(`${DEP_URL}/country`).then((resp) => {
      setCountries(resp.data);
    });
  };
  const addNode = async (data, idParam) => {
    const response = await axios.post(
      `${DEP_URL}/node`,
      {
        nodeType: { id: 1 },
        position: { id: positions.find((pos) => data.position === pos.name).id },
        subunitType: { id: subunitType.find((type) => data.subunitType === type.key).id },
        title: data.title,
        parentNode: {
          id: idParam
        },
        country: { id: data.country }
      },
      {
        headers: {
          Authorization: `Bearer ${user.authTokenInfo.access_token}`
        }
      }
    );
    if (response.data.subunitType === 'TT') {
      addPackage(idParam, response.data.id);
      addDrink(idParam, response.data.id);
      addIngredient(idParam, response.data.id);
    }
    getAllStructure();
  };
  const addPackage = async (franchise, tt) => {
    await axios.post(`${REST_URL}/api/raws/tt/add/package?franchiseId=${franchise}&ttId=${tt}`);
  };
  const addDrink = async (franchise, tt) => {
    await axios.post(`${REST_URL}/api/raws/tt/add/drink?franchiseId=${franchise}&ttId=${tt}`);
  };
  const addIngredient = async (franchise, tt) => {
    await axios.post(`${REST_URL}/api/raws/tt/add/ingredient?franchiseId=${franchise}&ttId=${tt}`);
  };
  const addSUser = (userID, nodeId) => {
    axios.put(`${DEP_URL}/node/${nodeId}/addUser?userId=${userID}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
  };
  const addCash = (data, nodeId) => {
    axios.put(`${DEP_URL}/node/${nodeId.id}/addCreItemId?creItemId=${data.title}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
  };

  const addSpecialist = async (data, idParam) => {
    await axios.post(
      `${DEP_URL}/node`,
      {
        nodeType: { id: 2 },
        position: { id: positions.find((pos) => data.position === pos.name).id },
        title: data.title,
        parentNode: {
          id: idParam
        }
      },
      {
        headers: {
          Authorization: `Bearer ${user.authTokenInfo.access_token}`
        }
      }
    );
    getAllStructure();
  };
  const deleteNode = async (userID) => {
    await axios.delete(`${DEP_URL}/node/${userID}`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
    getAllStructure();
  };
  const getAllStructure = async () => {
    const response = await axios.get(`${DEP_URL}/node/company`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
    setStructure(response.data);
  };
  // Список Должностей
  const getPositions = () =>
    axios.get(`${DEP_URL}/position`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
  const init = async () => {
    const response = await getPositions();
    setPositions(response.data);
  };
  // Список подразделений
  const getSubunitType = () =>
    axios.get(`${DEP_URL}/subunit/type`, {
      headers: {
        Authorization: `Bearer ${user.authTokenInfo.access_token}`
      }
    });
  const initi = async () => {
    const response = await getSubunitType();
    setSubunitType(response.data);
  };

  useEffect(() => {
    getCountries();
    getAllStructure().then();
    init();
    initi();
  }, []);
  return (
    <Page title="Орг. структура">
      <Typography variant="h5">Орг Структура</Typography>
      <DepartmentStructure
        org={structure}
        deleteNode={deleteNode}
        addNode={addNode}
        addSpecialist={addSpecialist}
        addUsers={addSUser}
        addCash={addCash}
        positions={positions}
        subunitType={subunitType}
        getAllStructure={getAllStructure}
        countries={countries}
      />
    </Page>
  );
}
