import {
  BookOpenText,
  CheckSquare,
  Clapperboard,
  Gamepad2,
  Globe2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useRouterState } from '@tanstack/react-router';

import animeImage from '@/assets/pics/luffy.png';
import gamesImage from '@/assets/pics/games.png';
import movieImage from '@/assets/pics/Movie.png';
import siteImage from '@/assets/pics/Site.png';
import tasksImage from '@/assets/pics/Tasks.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

type AppRoute = '/site' | '/tasks' | '/anime' | '/movies' | '/games' | '/docs';

type NavItem = {
  title: string;
  label: string;
  to: AppRoute;
  icon: LucideIcon;
  imageSrc?: string;
};

const mainNavItems: NavItem[] = [
  {
    title: 'Site',
    label: 'Site4Site',
    to: '/site',
    icon: Globe2,
    imageSrc: siteImage,
  },
  {
    title: 'Tasks',
    label: 'Site4Tasks',
    to: '/tasks',
    icon: CheckSquare,
    imageSrc: tasksImage,
  },
  {
    title: 'Anime',
    label: 'Site4Anime',
    to: '/anime',
    icon: Sparkles,
    imageSrc: animeImage,
  },
  {
    title: 'Movies',
    label: 'Site4Movies',
    to: '/movies',
    icon: Clapperboard,
    imageSrc: movieImage,
  },
  {
    title: 'Games',
    label: 'Site4Games',
    to: '/games',
    icon: Gamepad2,
    imageSrc: gamesImage,
  },
];

const footerNavItems: NavItem[] = [
  { title: 'Docs', label: 'Docs', to: '/docs', icon: BookOpenText },
];

const MotionLink = motion.create(Link);

const menuItemMotion = {
  rest: {},
  hover: {},
};

const imageMotion = {
  rest: { x: '110%', opacity: 0 },
  hover: { x: '0%', opacity: 1 },
};

const labelMotion = {
  rest: { x: 0 },
  hover: { x: -6 },
};

export default function AppSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Site4Site">
              {/* <Link to="/" className="font-[Urbanist]"> */}
              {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"> */}
              {/* <LayoutDashboard className="size-4" /> */}
              {/* </div> */}
              <div className="flex flex-1 text-left text-sm leading-tight">
                <SidebarTrigger className="cursor-pointer" />
                <span className="truncate font-semibold">Site4Site</span>
                {/* <span className="truncate text-xs text-sidebar-foreground/70">
                    Workspace
                  </span> */}
              </div>
              {/* </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="relative right-4 bottom-1" />
      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <AppSidebarItem
                  key={item.to}
                  item={item}
                  isActive={isActiveRoute(pathname, item.to)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="relative right-4 bottom-1" />
      <SidebarFooter>
        <SidebarMenu>
          {footerNavItems.map((item) => (
            <AppSidebarItem
              key={item.to}
              item={item}
              isActive={isActiveRoute(pathname, item.to)}
            />
          ))}
        </SidebarMenu>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

function AppSidebarItem({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={
          item.imageSrc
            ? 'h-12 pr-14 group-data-[collapsible=icon]:pr-2'
            : undefined
        }
      >
        <MotionLink
          to={item.to}
          variants={menuItemMotion}
          initial="rest"
          animate="rest"
          whileHover="hover"
          onClick={() => {
            if (isMobile) {
              setOpenMobile(false);
            }
          }}
        >
          <Icon className="relative z-10" />
          <motion.span variants={labelMotion} className="relative z-10">
            {item.label}
          </motion.span>
          {item.imageSrc ? (
            <motion.img
              src={item.imageSrc}
              alt=""
              aria-hidden="true"
              variants={imageMotion}
              className="pointer-events-none absolute right-2 h-12 w-12 object-contain group-data-[collapsible=icon]:hidden"
            />
          ) : null}
        </MotionLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function isActiveRoute(pathname: string, to: AppRoute) {
  return pathname === to || pathname.startsWith(`${to}/`);
}
