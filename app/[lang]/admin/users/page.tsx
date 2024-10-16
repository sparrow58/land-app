import { Suspense } from "react";
import { UserTableSkeleton } from "./UserTableSkeleton";
import { UserTable } from "./UsersTable";
import { SearchForm } from "./SearchForm";

export default function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const sort = (searchParams.sort as string) || "createdAt";
  const order = (searchParams.order as "asc" | "desc") || "desc";
  const search = (searchParams.search as string) || "";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <SearchForm />
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable
          page={page}
          limit={limit}
          sort={sort}
          order={order}
          search={search}
        />
      </Suspense>
    </div>
  );
}
