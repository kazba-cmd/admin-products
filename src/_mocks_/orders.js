import faker from 'faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const orders = [...Array(10)].map(() => ({
  id: faker.datatype.uuid(),
  number: faker.datatype.number({ min: 10, max: 99 }),
  status: sample(['В работе', 'Выдан', 'Отменен']),
  type: sample(['Доставка']),
  payment: 'Карта',
  totalPrice: faker.datatype.number({ max: 10000 })
}));

export default orders;
