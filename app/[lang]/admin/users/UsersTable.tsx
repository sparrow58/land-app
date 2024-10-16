import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { getUsers } from "@/app/services/user/getUserService";
import { DeleteUserButton } from "./DeleteUserButton";
import { headers } from "next/headers";
import EditUserButton from "./EditUserButton";
import { UserFormValues } from "./UserForm";

export async function UserTable({
  page,
  limit,
  sort,
  order,
  search,
}: {
  page: number;
  limit: number;
  sort: string;
  order: "asc" | "desc";
  search: string;
}) {
  const { users, totalPages } = await getUsers({
    page,
    limit,
    sort,
    order,
    search,
  });

  const headersList = headers();

  const pathname = headersList.get("x-invoke-path") ?? "";

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Link
                href={`${pathname}?page=${page}&limit=${limit}&sort=name&order=${
                  order === "asc" ? "desc" : "asc"
                }&search=${search}`}
              >
                <Button variant="ghost">
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>
              <Link
                href={`${pathname}?page=${page}&limit=${limit}&sort=role&order=${
                  order === "asc" ? "desc" : "asc"
                }&search=${search}`}
              >
                <Button variant="ghost">
                  Role <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </TableHead>
            <TableHead>Language</TableHead>
            <TableHead>
              <Link
                href={`${pathname}?page=${page}&limit=${limit}&sort=createdAt&order=${
                  order === "asc" ? "desc" : "asc"
                }&search=${search}`}
              >
                <Button variant="ghost">
                  Created At <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.username || "N/A"}</TableCell>
              <TableCell>
                {user.email ? (
                  <div>
                    {user.email}
                    {user.emailVerified && (
                      <Badge variant="secondary" className="ml-2">
                        Verified
                      </Badge>
                    )}
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{user.phone || "N/A"}</TableCell>
              <TableCell>
                {user.dateOfBirth
                  ? format(new Date(user.dateOfBirth), "dd MMM yyyy")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.role === "ADMIN" || user.role === "SUPERADMIN"
                      ? "destructive"
                      : "default"
                  }
                >
                  {user.role || "BASIC"}
                </Badge>
              </TableCell>
              <TableCell>{user.language || "N/A"}</TableCell>
              <TableCell>
                {format(new Date(user.createdAt), "dd MMM yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <EditUserButton user={user as UserFormValues} />
                  <DeleteUserButton userId={user.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Link
          href={`${pathname}?page=${Math.max(
            page - 1,
            1
          )}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`}
        >
          <Button variant="outline" size="sm" disabled={page === 1}>
            Previous
          </Button>
        </Link>
        <div className="text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <Link
          href={`${pathname}?page=${Math.min(
            page + 1,
            totalPages
          )}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`}
        >
          <Button variant="outline" size="sm" disabled={page === totalPages}>
            Next
          </Button>
        </Link>
      </div>
    </>
  );
}
