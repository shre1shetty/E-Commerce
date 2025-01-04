import * as React from "react";
import Logo from "../assets/Logo.png";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HousePlus,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  SquareUser,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LS } from "@/lib/SecureLocalStorage";
import { cn } from "@/lib/utils";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "Overview",
      icon: SquareTerminal,
      // isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Products To Display",
      url: "ProductsToDisplay",
      icon: Bot,
      // items: [
      //   {
      //     title: "Genesis",
      //     url: "#",
      //   },
      //   {
      //     title: "Explorer",
      //     url: "#",
      //   },
      //   {
      //     title: "Quantum",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Orders",
      url: "#",
      icon: BookOpen,
      // items: [
      //   {
      //     title: "Introduction",
      //     url: "#",
      //   },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Inventory",
      url: "Inventory",
      icon: HousePlus,
      items: [],
    },
    {
      title: "Customers",
      url: "#",
      icon: SquareUser,
      items: [],
    },
    {
      title: "Filters",
      url: "Filters",
      icon: Settings2,
      items: [],
    },
    {
      title: "Variant",
      url: "Variant",
      icon: Settings2,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={cn(
            "sidebar-header flex  items-center gap-2 text-lg text-[#7e8394]",
            props.open ? "h-16" : "h-8"
          )}
        >
          <img src={Logo} alt="" className="w-auto h-full" />
          <div className={props.open ? "" : "hidden"}>E-Cart Solutions</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} open={props.open} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
