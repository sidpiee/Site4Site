import { Link } from "@tanstack/react-router";
import ModeToggle from "../ui/dark-mode-button";

export default function Header() {
  return (
    <header className="sticky top-0 w-full z-50 mt-5 h-16 bg-background backdrop-blur border-b">
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-5xl font-extrabold italic tracking-tight font-[Zalando_Sans_Expanded]">
          <Link to="/">
            <span className="text-indigo-500">SITE</span>
            <span className="">4</span>
            <span className="text-indigo-500">SITE</span>
          </Link>
        </h1>
      </div>
      <div className="flex  items-center justify-end px-6">
        <nav>
          <ul className="flex items-center gap-15">
            <li>Docs</li>
            <li>About</li>
            <li>Contact Me</li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
