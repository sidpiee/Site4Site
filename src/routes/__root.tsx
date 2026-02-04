import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/Context/ThemeProvider";
import Header from "@/components/Layout/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="relative bg-linear-to-t from-blue-200 via-blue-300 to-blue-400 min-h-screen overflow-hidden w-full dark:bg-linear-to-t dark:from-blue-900 dark:via-indigo-900 dark:to-sky-900  ">
          <Header />
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  );
}
