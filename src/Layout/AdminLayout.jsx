import { AppSidebar } from "@/Components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/Components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

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
        <div className="navbar-search-container">
          <input type="text" className="" placeholder="Search ..." />
          <Search size={14} />
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
