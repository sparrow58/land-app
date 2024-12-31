import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AccountSidebar } from "./AccountSidbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AccountSidebar />

      {children}
    </SidebarProvider>
  );
}
