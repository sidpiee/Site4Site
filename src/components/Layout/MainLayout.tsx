import Header from './Header';
import Footer from './Footer';
import AppSidebar from '../ui/app-sidebar';
import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh min-w-0 overflow-hidden">
        <Header />
        <div className="flex min-h-0 flex-1 overflow-y-auto p-6 md:p-10 flex-col no-scrollbar">
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
