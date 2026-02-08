import Header from "./Header";
import Footer from "./Footer";
import AppSidebar from "../ui/app-sidebar";
import type { ReactNode } from "react";
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex z-10 flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 flex overflow-y-auto p-10 flex-col">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
