import {
  Building,
  DollarSign,
  FileArchive,
  FileMinus2,
  Gamepad,
  GitCompare,
  Laptop,
  LayoutDashboard,
  LucideIcon,
  Users,
} from 'lucide-react';

export type NavItem = {
  title: string;
  icon: LucideIcon;
  path: string;
  roles: ('ADMIN' | 'OPERATOR')[];
};

export const navItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    title: 'Organizações',
    icon: GitCompare,
    path: '/organizations',
    roles: ['ADMIN'],
  },
  {
    title: 'Usuários',
    icon: Users,
    path: '/users',
    roles: ['ADMIN'],
  },
  {
    title: 'Locais',
    icon: Building,
    path: '/establishments',
    roles: ['ADMIN'],
  },
  {
    title: 'Terminais',
    icon: Laptop,
    path: '/terminals',
    roles: ['ADMIN'],
  },
  {
    title: 'Interfaces',
    icon: Gamepad,
    path: '/interfaces',
    roles: ['ADMIN'],
  },
  {
    title: 'Leituras',
    icon: FileArchive,
    path: '/cash-flows',
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    title: 'Financeiro',
    icon: DollarSign,
    path: '/financial',
    roles: [],
  },
  {
    title: 'Fechamento',
    icon: DollarSign,
    path: '/closure',
    roles: ['ADMIN'],
  },
  {
    title: 'Despesas',
    icon: FileMinus2,
    path: '/expenses',
    roles: ['ADMIN', 'OPERATOR'],
  },
] as NavItem[];
