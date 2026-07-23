import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import logo from '../../public/Logo.svg';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase.ts';
export const Route = createFileRoute('/signIn')({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      throw redirect({ to: '/site' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState<string>('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [sent, setSent] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState(0);
  const [loding, setLoding] = useState<boolean>(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function sendMail() {
    setLoding(true);
    if (!emailRegex.test(email)) {
      toast.error('Invalid email!');
      setEmail('');
      setLoding(false);
      return;
    }

    const redirectUrl = `${import.meta.env.VITE_URL || window.location.origin}/site`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      setCooldown(60);
      toast.success('Magic link sent!');
    }
    setLoding(false);
  }

  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground bg-linear-to-tr from-black via-white/5 to-black flex flex-col items-center gap-10">
        <img
          src={logo}
          alt=""
          className="z-0 opacity-5 h-screen w-full absolute"
        />
        <h1 className="text-5xl font-extrabold italic tracking-tight font-[Zalando_Sans_Expanded] text-center pt-10 z-10 ">
          <Link to="/" className="">
            <span className="text-indigo-500">SITE</span>
            <span className="">4</span>
            <span className="text-indigo-500">SITE</span>
          </Link>
        </h1>
        <div className="border-2 border-white/30  backdrop-blur-4xl bg-black/50  p-5 w-100 rounded-lg z-10 ">
          <p className="text-center text-3xl mb-5 font-bold font-[Urbanist]">
            Verify Account
          </p>
          <FieldSet className="w-full max-w-xs flex flex-col ">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="Email">Email</FieldLabel>
                <Input
                  id="Email"
                  type="email"
                  placeholder="123@a.com"
                  value={email}
                  onChange={(e) => {
                    setSent(false);
                    setEmail(e.target.value);
                  }}
                />
              </Field>
            </FieldGroup>

            <Button
              onClick={sendMail}
              disabled={cooldown > 0 || loding}
              className="cursor-pointer bg-black drop-shadow-sm drop-shadow-white/20 hover:bg-slate-800 hover:border-blue-600 border-2 transition-all duration-150"
            >
              {loding
                ? 'Loading...'
                : cooldown > 0
                  ? `Resend Link in ${cooldown}s`
                  : 'Send Link'}
            </Button>
            <FieldDescription className="text-center">
              {!sent
                ? 'A link will be sent on this email !'
                : `Link sent on email ${email}`}
            </FieldDescription>
          </FieldSet>
        </div>
      </div>
    </div>
  );
}
