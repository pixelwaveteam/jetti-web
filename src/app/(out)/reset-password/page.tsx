import { HeaderAuthLayout } from '@/components/header/out';

import { ResetPasswordForm } from './reset-password-form';

export default function ResetPassword() {
  return (
    <div className='space-y-10 w-full'>
      <HeaderAuthLayout description='Crie uma nova senha' />
      <ResetPasswordForm />
    </div>
  );
}
