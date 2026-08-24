import logo from '/Logo.svg';
import { Copyright, Github, Linkedin, Mail } from 'lucide-react';
export default function Footer() {
  return (
    <footer>
      <div className="flex w-full flex-col gap-4 border-t bg-footer px-4 py-4 text-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-5 w-5" />
            <h1 className="truncate text-sm font-[Poppins] italic font-semibold sm:text-md">
              Save it. Tag it. Remember why.
            </h1>
          </div>
          <h1 className="text-foreground flex items-center gap-2 text-xs">
            <Copyright size={12} className="inline" /> 2026 Siddharth Sharma.
            All rights reserved.
          </h1>
        </div>
        <div className="flex items-center justify-start gap-6 sm:justify-end sm:gap-8">
          <a
            href="https://github.com/sidpiee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/siddharth-sharma-b236312a3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:site4site.dev@gmail.com"
            aria-label="Email Site4Site"
            title="Email me"
          >
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
}
