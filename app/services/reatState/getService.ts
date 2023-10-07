import prisma from "@/lib/prisma";
import { RealEstateType } from "@prisma/client";
interface QueryParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  type?: RealEstateType;
}
export async function getRealEstates(queryParams: QueryParams) {
  const {
    page = 1,
    pageSize = 10,
    searchQuery,
    type,
    sortField = "createdAt", // Default sorting field
    sortOrder = "asc", // Default sorting order
  } = queryParams;
  const offset = (page - 1) * pageSize;
  let query = {
    skip: offset,
    take: pageSize,
    orderBy: {
      [sortField]: sortOrder,
    },
    where: { type: type },
  } as any;

  // console.log("Query", query);
  if (searchQuery) {
    query = {
      ...query,
      where: {
        ...query.where,
        OR: [
          { title: { contains: searchQuery } },
          { description: { contains: searchQuery } },
        ],
      },
    };
  }

  const data = await prisma.realEstate.findMany(query);
  const count = await prisma.realEstate.count({ where: query.where });
  return { data, count };
}
export async function getRealEstate(id: string) {
  return await prisma.realEstate.findUnique({ where: { id: id } });
}
