import Header from './Header';
import Footer from './Footer';
import AppSidebar from '../ui/app-sidebar';
import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh min-w-0 overflow-x-hidden">
        <Header />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3 pb-6 sm:p-5 sm:pb-8 md:p-10 no-scrollbar">
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
