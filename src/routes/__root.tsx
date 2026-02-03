import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="relative bg-linear-to-t from-blue-200 via-blue-300 to-blue-400 min-h-screen overflow-hidden w-full ">
        <Outlet />
      </div>
    </>
  );
}
