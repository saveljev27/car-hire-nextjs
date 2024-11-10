import { StoreProvider } from '@/shared/components';
import '../../globals.css';

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className="relative">{children}</body>
      </StoreProvider>
    </html>
  );
}
