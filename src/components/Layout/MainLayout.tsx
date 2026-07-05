import Header from './Header';
import Footer from './Footer';
import AppSidebar from '../ui/app-sidebar';
import type { ReactNode } from 'react';
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="flex z-10 min-h-0 flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 min-h-0 flex overflow-y-auto no-scrollbar p-10 flex-col">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
