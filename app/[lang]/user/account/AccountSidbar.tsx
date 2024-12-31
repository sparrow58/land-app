import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Account",
    icon: User,
    url: "/account",
  },
  {
    title: "Preferences",
    icon: Settings,
    url: "/account/preferences",
  },
];

export function AccountSidebar() {
  return (
    <Sidebar collapsible="icon" className="pt-20 border-none">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={item.url === "/account"}>
                <Link href={item.url}>
                  <item.icon className="w-10" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
