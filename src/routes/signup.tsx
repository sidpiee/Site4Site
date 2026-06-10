import { createFileRoute } from '@tanstack/react-router';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});
import logo from '../../public/Logo.svg';

function RouteComponent() {
  return (
    <div className=" bg-linear-to-tr from-black via-white/5 to-black h-screen flex flex-col items-center gap-10">
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
          Create Account
        </p>
        <FieldSet className="w-full max-w-xs flex flex-col ">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>

              <Input id="username" type="text" placeholder="Ben dover" />
              <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="Email">Email</FieldLabel>
              <Input id="Email" type="email" placeholder="123@a.com" />
            </Field>
          </FieldGroup>

          <Button className="cursor-pointer bg-black drop-shadow-sm drop-shadow-white/20 hover:bg-slate-800 hover:border-blue-600 border-2 transition-all duration-150">
            Create Account
          </Button>

          <FieldDescription className="text-center">
            Already a user ? Login link
          </FieldDescription>
        </FieldSet>
      </div>
    </div>
  );
}
