"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `${pathname}?page=1&limit=10&sort=createdAt&order=desc&search=${searchTerm}`
    );
  };

  useEffect(() => {
    const search = searchParams.get("search");
    setSearchTerm(search ?? "");
  });
  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
