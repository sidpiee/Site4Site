import { motion } from "motion/react";
import anime from "@/assets/pics/luffy.png";
import site from "@/assets/pics/Site.png";
import games from "@/assets/pics/games.png";
import Tasks from "@/assets/pics/Tasks.png";
import Movie from "@/assets/pics/Movie.png";
import { Link } from "@tanstack/react-router";

export default function Sidebar() {
  return (
    <aside className="w-55 shrink-0 border-r border-border bg-sidebar  overflow-y-auto rounded-r-2xl no-scrollbar">
      <nav className="flex h-full flex-col gap-6 mt-5 ">
        <SidebarItem label="Site" imgSrc={site} to="/site" />
        <SidebarItem label="Tasks" imgSrc={Tasks} to="/tasks" />
        <SidebarItem label="Anime" imgSrc={anime} to="/anime" />
        <SidebarItem label="Movies" imgSrc={Movie} to="/movies" />
        <SidebarItem label="Games" imgSrc={games} to="/games" />
      </nav>
    </aside>
  );
}
const MotionLink = motion.create(Link);
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

function SidebarItem({
  label,
  imgSrc,
  to,
}: {
  label: string;
  imgSrc: any;
  to: string;
}) {
  return (
    <MotionLink
      to={to}
      variants={container}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className=" px-6 py-4 relative flex items-center font-[Figtree]  overflow-hidden cursor-pointer"
    >
      <motion.span
        variants={text}
        className="text-foreground z-10 text-lg font-semibold "
      >
        Site4{label}
      </motion.span>
      <motion.img
        src={imgSrc}
        alt=""
        variants={image}
        className="absolute right-4 h-16 w-16 object-contain"
      />
    </MotionLink>
  );
}
