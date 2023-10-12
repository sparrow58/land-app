import { getTypeFromRoute, stringToEnum } from "@/app/helpers/converters";
import { RealEstateType } from "@prisma/client";
import React, { Suspense } from "react";
import RealList from "./RealList";
import { getRealEstates } from "@/app/services/reatState/getService";
import Loading from "@/app/[lang]/loading";
import Pagination from "@/app/components/Pagination";
import { LangParams, SearchParams } from "@/app/Props/RoutingProps";
import { getDictionary } from "@/lib/dictionary";
type Props = LangParams &
  SearchParams & {
    params: {
      type: string;
    };
  };
const page = async ({ params: { type, lang }, searchParams }: Props) => {
  const MAX_PER_PAGE = 3;
  const PAR_PAGE = 6;

  const {
    verified,
    currencies: { YR },
    next,
    previous,
    explore_the,
    real_estate: { type_p },
  } = await getDictionary(lang);
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
              {realType &&
                `${explore_the} ${(type_p as any)[realType.toLowerCase()]}`}
            </h2>
          </div>
          <Suspense fallback={<Loading />}>
            <RealList data={data} YR={YR} verified={verified} />
            {count > data.length && (
              <Pagination
                hasNextPage={end < count}
                hasPrevPage={start > 0}
                perPage={PAR_PAGE}
                searchParams={searchParams}
                next={next}
                previous={previous}
              />
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default page;
