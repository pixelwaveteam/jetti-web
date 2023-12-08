import { HeaderAuthLayout } from '@/components/header/out';

import { SignInForm } from './sign-in-form';

export default function SignIn() {
  return (
    <div className='space-y-10 w-full'>
      <HeaderAuthLayout description='Entre em sua conta' />
      <SignInForm />
    </div>
  );
}
