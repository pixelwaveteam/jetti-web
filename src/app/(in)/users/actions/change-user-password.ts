'use server';

import { api } from '@/lib/api';

interface ChangeUserPasswordProps {
  userId: string;
  password: string;
  passwordConfirmation: string;
}

export async function changeUserPassword(data: ChangeUserPasswordProps) {
  await api('/users/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
