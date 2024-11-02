import React from "react";
import { Link, useParams } from "react-router-dom";

const Pagination = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber, 10) || page; // Fallback to `page` if `pageNumber` is undefined

  return (
    <div className="m-10">
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {/* Previous Page */}
        {page > 1 && (
          <li>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page - 1}`
                    : `/page/${page - 1}`
                  : `/admin/productlist/${page - 1}`
              }
              className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-gray-50 text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        )}

        {/* Page Numbers */}
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
              className={`${
                currentPage === x + 1 ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600"
              } block font-poppins size-8 rounded border border-gray-300 text-center leading-8 `}
            >
              {x + 1}
            </Link>
          </li>
        ))}

        {/* Next Page */}
        {page < pages && (
          <li>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page + 1}`
                    : `/page/${page + 1}`
                  : `/admin/productlist/${page + 1}`
              }
              className="inline-flex size-8 items-center justify-center rounded border bg-gray-50 text-gray-900 rtl:rotate-180 border-gray-300"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
};

export default Pagination;
