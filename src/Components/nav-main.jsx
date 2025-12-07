import { ChevronRight } from "lucide-react";
import "@/Components/Sidebar/Sidebar.scss";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { LS } from "@/lib/SecureLocalStorage";

export function NavMain({ items, open }) {
  const navigate = useNavigate();
  // const regex = /[^\/]+\/(.+)$/;
  // const menuName = window.location.pathname.match(regex);
  // console.log(menuName);
  // LS.set("activeMenu", menuName?.length > 0 ? menuName[1] : "");
  return (
    <SidebarGroup className={!open ? "!p-2" : ""}>
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton className="" asChild>
                          {/* <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a> */}
                          <div
                            className={
                              window.location.pathname.replace("/", "") ===
                              subItem.title.replaceAll(" ", "")
                                ? "active cursor-pointer"
                                : " cursor-pointer"
                            }
                            onClick={() => navigate(subItem.url)}
                          >
                            <span className="">{subItem.title}</span>
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuButton asChild>
              <div
                className={
                  window.location.pathname.replace("/", "") ===
                  item.title.replaceAll(" ", "")
                    ? "active cursor-pointer"
                    : " cursor-pointer"
                }
                onClick={() => navigate(item.url)}
              >
                <item.icon />
                {open && <span className="">{item.title}</span>}
              </div>
            </SidebarMenuButton>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
