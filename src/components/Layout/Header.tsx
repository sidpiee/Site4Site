import { Link, useNavigate } from '@tanstack/react-router';
import ModeToggle from '../ui/dark-mode-button';
import { Button } from '../ui/button';
import { useAuth } from '../Context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SidebarTrigger } from '../ui/sidebar';

export default function Header() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Signed out');
    void navigate({ to: '/signIn' });
  }

  return (
    <header className="sticky top-0 z-50 h-15 shrink-0 border-b-2 bg-background/95 backdrop-blur">
      <nav className="h-full">
        <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-1">
            <SidebarTrigger className="size-9 shrink-0 md:hidden" />
            <h1 className="truncate text-lg font-extrabold italic tracking-tight font-[Zalando_Sans_Expanded] sm:text-3xl">
            <Link to="/">
              <span className="text-indigo-500">SITE</span>
              <span className="">4</span>
              <span className="text-indigo-500">SITE</span>
            </Link>
            </h1>
          </div>
          <ul className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-4">
            <li className="hidden sm:list-item">
              <Link to="/docs">Docs</Link>
            </li>
            {/* <li className="hidden md:list-item">About</li> */}
            <li>
              <ModeToggle />
            </li>
            <li>
              {user ? (
                <Button
                  className="cursor-pointer font-[Urbanist] font-semibold bg-red-500 hover:bg-red-700"
                  onClick={handleSignOut}
                  disabled={isLoading}
                  >
                    <span className="sm:hidden">Log out</span>
                    <span className="hidden sm:inline">Sign out</span>
                </Button>
              ) : (
                <Link to="/signIn">
                  <Button className="cursor-pointer px-3 font-[Urbanist] font-semibold sm:px-4">
                    <span className="sm:hidden">Log in</span>
                    <span className="hidden sm:inline">Sign in</span>
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
