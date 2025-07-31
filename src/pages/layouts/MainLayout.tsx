import { type ReactNode } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isAuthenticated } = useAuth()
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      
      <Header user={user} isAuthenticated={isAuthenticated}  />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}