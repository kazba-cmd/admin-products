import axios from 'axios';
import { DEP_URL } from './constants';

export const dumbFunc = () => {};

export const getItemIndex = (arr = [], nameToFind) => {
  const names = arr.map((item) => item.name);
  return names.indexOf(nameToFind);
};

export function getAuztItemIndex(arr, name, sauce) {
  for (let i = 0; i < arr.length; i += 1) {
    const el = arr[i];
    if (el.name === name && el.sauce.value === sauce.value) return i;
  }
  return -1;
}

export function isEmptyObject(obj) {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
}
export const updateCurrentNode = async (id, token) => {
  const response = await axios.get(`${DEP_URL}/node/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  // setCurrentNode(response.data);
  console.log(response.data);
};

// проверить если последний элемиент в массиве
export const isLast = (arr = [], index) => arr.length === index + 1;

export const isDarkTheme = (mode) => mode === 'dark';

// export const getAuztItemIndex = (arr = [], name, sauce) => {
//   const [qwe] = arr.filter((i) => i.name === name && i.sauce === sauce);
//   return qwe ? qwe : -1;
//   // const names = arr.map((item) => item.name);
//   // return names.indexOf(name);
// };
