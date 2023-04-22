import { Icon } from '@iconify/react';
import options2Fill from '@iconify/icons-eva/options-2-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Управление',
    path: '/',
    icon: getIcon(options2Fill),
    children: [
      {
        title: 'Добавить пользователя',
        path: 'control/users'
      },
      {
        title: 'ОРГ структура',
        path: 'control/department'
      }
    ]
  }
];

export default sidebarConfig;
