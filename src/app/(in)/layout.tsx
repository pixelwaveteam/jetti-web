import { HeaderDashLayout } from '@/components/header/in';
import { SideBar } from '@/components/sidebar';

interface DashLayoutProps {
  children: React.ReactNode;
}

export default function DashLayout({ children }: DashLayoutProps) {
  return (
    <div className='flex min-h-screen w-full'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <HeaderDashLayout />
        <main className='flex flex-1 mt-8 overflow-y-auto mx-auto w-full max-w-6xl px-4'>
          {children}
        </main>
      </div>
    </div>
  );
}
