import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/Context/ThemeProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
      </ThemeProvider>
    </>
  );
}
