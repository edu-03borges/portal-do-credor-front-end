// assets
import { IconDashboard, IconUser } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconUser };

// ==============================|| MENU ITEMS ||============================== //

const menu = {
  id: 'menu',
  title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'menu',
      title: 'Dashboard',
      type: 'item',
      url: '/menu/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'debtors',
      title: 'Devedores',
      type: 'item',
      url: '/menu/debtors',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
};

export default menu;
