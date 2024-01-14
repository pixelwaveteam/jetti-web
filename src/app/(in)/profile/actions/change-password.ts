'use server';

import { api } from '@/lib/api';

interface ChangePasswordProps {
  password: string;
  passwordConfirmation: string;
}

export async function changePassword(data: ChangePasswordProps) {
  await api('/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
