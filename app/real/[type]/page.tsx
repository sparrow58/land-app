import { getTypeFromRoute, stringToEnum } from "@/app/helpers/converters";
import { RealEstateType } from "@prisma/client";
import React, { Suspense } from "react";
import RealList from "./RealList";
import { getRealEstates } from "@/app/services/reatState/getService";
import Loading from "@/app/loading";
import Pagination from "@/app/components/Pagination";
interface Props {
  params: {
    type: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}
const page = async ({ params: { type }, searchParams }: Props) => {
  const MAX_PER_PAGE = 1;

  const realType = stringToEnum(RealEstateType, getTypeFromRoute(type));
  const page = Number(searchParams["page"] ?? "1");
  const parPageT = Number(searchParams["per_page"] ?? MAX_PER_PAGE);
  const perPage = parPageT > MAX_PER_PAGE ? MAX_PER_PAGE : parPageT;
  const start = (page - 1) * perPage; // 0, 5, 10 ...
  const end = start + perPage; // 5, 10, 15 ...
  const { data, count } = await getRealEstates({
    page: page,
    pageSize: perPage,
    type: realType,
  });
  // console.log("start end", start, end);
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-5">
            <h2 className="h2 mb-4 capitalize">
              Explore the {realType?.toLowerCase()}s
            </h2>
          </div>
          <Suspense fallback={<Loading />}>
            <RealList data={data} />
            {count > data.length && (
              <Pagination
                hasNextPage={end < count}
                hasPrevPage={start > 0}
                perPage={6}
              />
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default page;
