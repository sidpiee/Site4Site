import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="flex z-10">
        <AppSidebar />
        <main className="flex-1 mt-10 overflow-y-auto">
          <h1>hello</h1>
        </main>
      </div>
      <Footer />
    </>
  );
}
