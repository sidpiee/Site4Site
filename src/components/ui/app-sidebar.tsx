export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card h-screen overflow-y-auto rounded-r-2xl no-scrollbar">
      <nav className="flex h-full flex-col gap-5 mt-5 ">
        <SidebarItem label="Site" />
        <SidebarItem label="Anime" />
        <SidebarItem label="Movies" />
        <SidebarItem label="Tasks" />
        <SidebarItem label="Games" />
      </nav>
    </aside>
  );
}

function SidebarItem({ label }: { label: string }) {
  return (
    <button className=" px-6 py-4 text-left text-sm font-medium text-foreground hover:bg-muted">
      Site4{label}
    </button>
  );
}
