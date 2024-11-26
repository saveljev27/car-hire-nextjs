import { NavBar, StoreProvider } from '@/shared/components';
import '../../globals.css';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { findProfileInfo } from '@/app/actions/profile';

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  if (!session) redirect('/');

  const adminStatusCheck = await findProfileInfo();
  if (!adminStatusCheck.isAdmin) redirect('/');
  return (
    <html lang="en">
      <body className="relative">
        <StoreProvider>
          <NavBar session={session} />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
