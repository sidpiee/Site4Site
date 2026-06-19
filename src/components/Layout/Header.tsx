import { Link, useNavigate } from '@tanstack/react-router';
import ModeToggle from '../ui/dark-mode-button';
import { Button } from '../ui/button';
import { useAuth } from '../Context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
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
    <header className="sticky top-0 w-full z-50 pt-2 h-15 bg-background backdrop-blur border-b-2  ">
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
            <li>
              <ModeToggle />
            </li>
            <li>
              {user ? (
                <Button
                  className="cursor-pointer font-[Urbanist] font-semibold bg-red-500"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  Sign out
                </Button>
              ) : (
                <Link to="/signIn">
                  <Button className="cursor-pointer font-[Urbanist] font-semibold">
                    Sign in
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
