import {
  Building,
  DollarSign,
  FileArchive,
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
    roles: ['ADMIN', 'OPERATOR'],
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
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    title: 'Terminais',
    icon: Laptop,
    path: '/terminals',
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    title: 'Interfaces',
    icon: Gamepad,
    path: '/interfaces',
    roles: ['ADMIN', 'OPERATOR'],
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
] as NavItem[];
