import Header from "./Header";
import Footer from "./Footer";
import AppSidebar from "../ui/app-sidebar";
import type { ReactNode } from "react";
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex z-10">
        <AppSidebar />
        <main className="flex-1 flex mt-10 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </>
  );
}
