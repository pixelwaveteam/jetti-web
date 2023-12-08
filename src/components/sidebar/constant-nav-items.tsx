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
};

export const navItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/overview',
  },
  {
    title: 'Organizações',
    icon: GitCompare,
    path: '/organizations',
  },
  {
    title: 'Usuários',
    icon: Users,
    path: '/users',
  },
  {
    title: 'Locais',
    icon: Building,
    path: '/establishments',
  },
  {
    title: 'Terminais',
    icon: Laptop,
    path: '/terminals',
  },
  {
    title: 'Interfaces',
    icon: Gamepad,
    path: '/interfaces',
  },
  {
    title: 'Leituras',
    icon: FileArchive,
    path: '/cash-flows',
  },
  {
    title: 'Financeiro',
    icon: DollarSign,
    path: '/financial',
  },
] as NavItem[];
