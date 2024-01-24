import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { HeaderDashLayout } from '@/components/header/in';
import { SideBar } from '@/components/sidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface InLayoutProps {
  children: React.ReactNode;
}

export default async function InLayout({ children }: InLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect(`/auth/signin`);
  }

  return (
    <div className='flex min-h-screen w-full'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <HeaderDashLayout />
        <main className='flex flex-1 mt-8 overflow-y-auto mx-auto w-full max-w-7xl px-4'>
          {children}
        </main>
      </div>
    </div>
  );
}
