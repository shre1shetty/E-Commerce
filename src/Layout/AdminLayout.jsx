import { AppSidebar } from "@/Components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/Components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import React, { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const data = [
  {
    title: "Overview",
    url: "Overview",
  },
  {
    title: "Products To Display",
    url: "ProductsToDisplay",
  },
  {
    title: "Orders",
    url: "Orders",
  },
  {
    title: "Inventory",
    url: "Inventory",
  },
  {
    title: "Filters",
    url: "Filters",
  },
  {
    title: "Layout",
    url: "Layout",
  },
  {
    title: "Variant",
    url: "Variant",
  },
  {
    title: "Stages",
    url: "Administration/Stages",
  },
  {
    title: "WorkFlow Defination",
    url: "Administration/WorkFlowDefination",
  },
];

const ComboboxDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between !bg-white no-shadow"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Search..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
        <Command>
          <CommandInput placeholder="Search Page..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Page found.</CommandEmpty>
            <CommandGroup>
              {data.map((page) => (
                <CommandItem
                  key={page.url}
                  value={page.url}
                  onSelect={(currentValue) => {
                    setValue(currentValue === page.url ? "" : currentValue);
                    navigate(currentValue);
                    setOpen(false);
                  }}
                >
                  {page.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === page.url ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const AdminNavBar = () => {
  const { open } = useSidebar();
  return (
    <>
      <div
        style={{
          width: `calc(
                        100% - ${open ? "16rem" : "3rem"} - 12px
                      )`,
        }}
        className="navbar-container max-sm:!w-[calc(100%-24px)]"
      >
        <SidebarTrigger />
        <div className="grow">
          <div className="navbar-search-container">
            {/* <input type="text" className="" placeholder="Search ..." />
          <Search size={14} /> */}
            <ComboboxDemo />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button>
            <Bell size={20} color="#686886" />
          </button>
          <button className="h-8 w-8 rounded-full overflow-hidden">
            <img src="/Gokuprofile.png" alt="" className="h-full w-full" />
          </button>
        </div>
      </div>
    </>
  );
};
const AdminLayout = () => {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <div className="container-div w-full">
          <AppSidebar />
          <div className={"bg-[#f2f4f7] grow p-3 text-black"}>
            <AdminNavBar />
            <div
              className={"bg-white rounded-lg h-full  px-1 md:px-[19px] mt-10"}
            >
              <Suspense fallback={<>Loading...</>}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
