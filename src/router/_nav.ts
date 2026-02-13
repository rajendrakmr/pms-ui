import { faBuildingUser, faPlaneDeparture, faReceipt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
interface NavItem {
  name: string;
  path: string;
  icon?: IconDefinition;
  isParent?: boolean;
  children?: NavItem[],
}

const _nav: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: faReceipt,
    isParent:true
  },
  {
    name: 'Dashboard',
    path: '/backend',
    icon: faReceipt,
    isParent:true
  },
  {
    name: 'Security',
    path: '/leave',
    icon: faPlaneDeparture,
    children: [
      {
        name: 'Leave type',
        path: '/leave/types',
      },
      {
        name: 'Holidays',
        path: '/holidays',
      },
      {
        name: 'Leave Application',
        path: '/leaves',
      },
    ],
  },
  {
    name: 'Agent',
    path: '/departmet',
    icon: faBuildingUser,
    children: [
      {
        name: 'Department',
        path: '/department',
      } 
    ],
  },
  {
    name: 'Employee',
    path: '/employees',
    icon: faUsers,
    children: [
      {
        name: 'Employee',
        path: '/employees',
      } 
    ],
  },
  // Add other navigation items here
];

export default _nav;
