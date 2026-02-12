import logo from "/Logo.svg";
import { Copyright, Github, Linkedin, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer>
      <div className="w-full bg-footer text-foreground px-4  flex border-t">
        <div className="flex flex-col gap-2">
          <div className="flex justify-start items-center gap-4">
            <img src={logo} alt="" className="h-5 w-5" />
            <h1 className="text-md  font-[Poppins] italic font-semibold">
              Save it. Tag it. Remember why.
            </h1>
          </div>
          <h1 className="text-foreground flex items-center gap-2 text-xs">
            <Copyright size={12} className="inline" /> 2026 Siddharth Sharma.
            All rights reserved.
          </h1>
        </div>
        <div className=" flex flex-1 justify-end px-10 items-center gap-10">
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
          <Mail />
        </div>
      </div>
    </footer>
  );
}
