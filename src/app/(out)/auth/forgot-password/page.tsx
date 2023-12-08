import { HeaderAuthLayout } from '@/components/header/out';

import { ForgotPasswordForm } from './forgot-password-form';

export default function ForgotPassword() {
  return (
    <div className='space-y-10 w-full'>
      <HeaderAuthLayout description='Recupere sua senha' />
      <ForgotPasswordForm />
    </div>
  );
}
