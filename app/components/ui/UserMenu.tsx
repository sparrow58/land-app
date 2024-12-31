"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, Bookmark, Search, Clock, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DefaultSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const UserMenu = ({ name, email, image }: DefaultSession) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image ?? ""} alt={name ?? ""} />
            <AvatarFallback>
              <UserCircle2 className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-0"
        align="end"
        forceMount
        sideOffset={6}
      >
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex items-center justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={image ?? ""} alt={name ?? ""} />
              <AvatarFallback>
                <UserCircle2 className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <p className="text-xl font-medium">Hi, {name}!</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/user/real">My Real Estates</Link>
          </Button>{" "}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/user/account">Manage your Account</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => signOut({ redirect: false })}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-normal text-muted-foreground">
            More options
          </DropdownMenuLabel>
          <DropdownMenuItem className="gap-2">
            <Clock className="h-4 w-4" />
            My Real Estates
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Bookmark className="h-4 w-4" />
            Saves & Collections
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Search className="h-4 w-4" />
            Search personalization
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
