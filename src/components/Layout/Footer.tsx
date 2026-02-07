import logo from "/Logo.svg";
import { Copyright, Github, Linkedin, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer>
      <div className="w-full bg-footer text-foreground px-4 py-2 flex border-t">
        <div className="flex flex-col gap-2">
          <div className="flex justify-start items-center gap-4">
            <img src={logo} alt="" className="h-10 w-10" />
            <h1 className="text-2xl  font-[Poppins] italic font-semibold">
              Save it. Tag it. Remember why.
            </h1>
          </div>
          <h1 className="text-foreground flex items-center gap-2 text-xs">
            <Copyright size={12} className="inline" /> 2026 Siddharth Sharma.
            All rights reserved.
          </h1>
        </div>
        <div className=" flex flex-1 justify-end px-10 items-center gap-10">
          <Github />
          <Linkedin />
          <Mail />
        </div>
      </div>
    </footer>
  );
}
