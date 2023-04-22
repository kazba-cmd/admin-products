import faker from 'faker';

// ----------------------------------------------------------------------

const usersOnShift = [...Array(4)].map(() => ({
  id: faker.datatype.uuid(),
  fullname: faker.name.findName(),
  hoursWorked: '08:50 / 3ч 30 мин',
  jobTitle: faker.name.jobTitle(),
  phone: `+7 ${faker.phone.phoneNumberFormat(5)}`,
  email: faker.internet.email(),
  onShift: true
}));

const usersNotOnShift = [...Array(3)].map(() => ({
  id: faker.datatype.uuid(),
  fullname: faker.name.findName(),
  hoursWorked: '08:50 / 3ч 30 мин',
  jobTitle: faker.name.jobTitle(),
  phone: `+7 ${faker.phone.phoneNumberFormat(5)}`,
  email: faker.internet.email(),
  onShift: false
}));

export { usersOnShift, usersNotOnShift };
