import * as React from "react";
import Logo from "../assets/Logo.png";
import Logo2 from "../assets/Logo2.png";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DoorOpen,
  Dot,
  Frame,
  GalleryVerticalEnd,
  HousePlus,
  LayoutGrid,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  SquareUser,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/Components/ui/sidebar";
import { LS } from "@/lib/SecureLocalStorage";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { setRole } from "@/Redux/Slice/UserSlice";
import { useDispatch } from "react-redux";

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
      url: "Orders",
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
    // {
    //   title: "Customers",
    //   url: "#",
    //   icon: SquareUser,
    //   items: [],
    // },
    {
      title: "Filters",
      url: "Filters",
      icon: Settings2,
      items: [],
    },
    {
      title: "Layout",
      url: "Layout",
      icon: LayoutGrid,
      items: [],
    },
    {
      title: "Variant",
      url: "Variant",
      icon: Settings2,
      items: [],
    },
    {
      title: "Administration",
      icon: Settings,
      items: [
        {
          title: "Stages",
          url: "Administration/Stages",
          icon: Dot,
        },
        {
          title: "WorkFlow Defination",
          url: "Administration/WorkFlowDefination",
          icon: Dot,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={cn(
            "sidebar-header flex  items-center gap-2 text-lg text-[#7e8394] overflow-hidden",
            props.open ? "h-[80px]" : "h-8"
          )}
        >
          <img
            src={props.open ? Logo2 : Logo}
            alt=""
            className="w-full h-full"
          />
          {/* <div
            className={
              props.open ? "whitespace-nowrap" : "whitespace-nowrap hidden"
            }
          >
            E-Cart Solutions
          </div> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} open={props.open} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <div
            className={" cursor-pointer"}
            onClick={() => {
              LS.clear();
              navigate("/");
              dispatch(setRole("user"));
            }}
          >
            <DoorOpen />
            {props.open && <span className="">Logout</span>}
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
