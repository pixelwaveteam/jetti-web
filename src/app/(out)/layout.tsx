interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='mx-auto flex items-center justify-center min-h-screen w-full px-4 md:max-w-[384px]'>
      {children}
    </div>
  );
}
