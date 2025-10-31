import { House, User, Folder, Mail, Github, Linkedin, Email } from "@deemlol/next-icons";
import Image from "next/image";
export default function Home() {
  return (

    // HEADER
    <div>
      <div className="flex items-center justify-between p-2 font-sans border-b border-zinc-200 dark:border-zinc-800 absolute w-full bg-zinc-50 dark:bg-black text-black dark:text-white">
        <div className="flex flex-row gap-1 w-full items-center justify-center uppercase tracking-widest">
          <a href="" className="text-red-800">{"<Portfolio>"}</a>
        </div>
      </div>

      {/* CUERPO PRINCIPAL */}
      <div className="flex flex-row h-dvh">
        <div className="w-8 flex flex-col gap-5 justify-end lg:justify-center items-center border-r py-20 lg:py-0 border-zinc-200 dark:border-zinc-800">
          <a href="">
            <House size={18} />
          </a>
          <a href="">
            <User size={18} />
          </a>
          <a href="">
            <Folder size={18} />
          </a>
          <a href="">
            <Mail size={18} />
          </a>
        </div>

        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black w-svw">
          <div className="text-4xl tracking-widest p-10">
            <p>Hi, I,m Angel,</p>
            <p>the solution to your problems.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div>
        <div className="flex items-center justify-between px-10 py-2 font-sans border-t border-zinc-200 dark:border-zinc-800  w-full bg-zinc-50 dark:bg-black text-gray-300 dark:text-gray-500 absolute bottom-0 ">
          <p className="tracking-widest capitalize">
            Angel T. Ramírez
          </p>
          <div className="flex flex-row gap-5 text-sm tracking-widest">
            <a href="https://github.com/AngelTaRa99" target="_blank" className="flex gap-2">
              <p className="hidden md:block">Github</p>
              <Github size={18} />
            </a>
            <a href="" className="flex gap-2">
              <p className="hidden md:block">LinkedIn</p>
              <Linkedin size={18} />
            </a>
            <a href="" className="flex gap-2">
              <p className="hidden md:block">Email</p>
              <Email size={18} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
