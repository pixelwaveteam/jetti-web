type UserRole = 'ADMIN' | 'OPERATOR'

export interface User {
  id: string;
  organizationId?: string;
  avatarId?: string;
  role: UserRole;
  name: string;
  password: string;
  isActive:  boolean;
}