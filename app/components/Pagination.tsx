"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
interface Props {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
}
const Pagination = ({ hasNextPage, hasPrevPage, perPage }: Props) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? perPage.toString();
  return (
    <div className="flex justify-center p-3">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <>
            <li>
              <Link
                href={`${pathname}?page=${
                  Number(page) - 1
                }&per_page=${per_page}`}
                className={`${
                  !hasPrevPage && "pointer-events-none opacity-50"
                } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300
                  hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
              >
                Previous{" "}
              </Link>
            </li>
            {/* <li>
                <a
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  href="#!"
                >
                  1
                </a>
              </li> */}
          </>

          <li aria-current="page">
            <a
              className="relative block rounded bg-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-50 transition-all duration-300 dark:bg-neutral-900"
              href="#!"
            >
              {page}
              <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                (current)
              </span>
            </a>
          </li>

          <>
            {/* <li>
                <a
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  href="#!"
                >
                  {Number(page) + 1}
                </a>
              </li> */}
            <Link
              href={`${pathname}?page=${Number(page) + 1}&per_page=${per_page}`}
              className={`${
                !hasNextPage && "pointer-events-none opacity-50"
              } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300
              hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
            >
              Next
            </Link>
          </>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
