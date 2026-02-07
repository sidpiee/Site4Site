import { motion } from "motion/react";
import anime from "@/assets/pics/luffy.png";
import site from "@/assets/pics/Site.png";
import games from "@/assets/pics/games.png";
import Tasks from "@/assets/pics/Tasks.png";
import Movie from "@/assets/pics/Movie.png";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card h-screen overflow-y-auto rounded-r-2xl no-scrollbar">
      <nav className="flex h-full flex-col gap-7 mt-5 ">
        <SidebarItem label="Site" imgSrc={site} />
        <SidebarItem label="Tasks" imgSrc={Tasks} />
        <SidebarItem label="Anime" imgSrc={anime} />
        <SidebarItem label="Movies" imgSrc={Movie} />
        <SidebarItem label="Games" imgSrc={games} />
      </nav>
    </aside>
  );
}
const container = {
  rest: {},
  hover: {},
};

const image = {
  rest: { x: "100%", opacity: 0 },
  hover: { x: "0%", opacity: 1 },
};

const text = {
  rest: { x: 0 },
  hover: { x: -8 },
};

function SidebarItem({ label, imgSrc }: { label: string; imgSrc: any }) {
  return (
    <motion.button
      variants={container}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className=" px-6 py-4 relative flex items-center  overflow-hidden cursor-pointer"
    >
      <motion.span
        variants={text}
        className="text-foreground z-10 text-lg font-bold font-[Zalando_Sans_Expanded]"
      >
        Site4{label}
      </motion.span>
      <motion.img
        src={imgSrc}
        alt=""
        variants={image}
        className="absolute right-4 h-16 w-16 object-contain"
      />
    </motion.button>
  );
}
