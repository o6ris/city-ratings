import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. `/districts/bridgeland/reviews`
};

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageLink = (page: number) => `${basePath}?page=${page}`;

  const pageButtons: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(i);
    }
  } else {
    pageButtons.push(1);

    if (currentPage > 3) {
      pageButtons.push("...");
    }

    const pagesToShow = [currentPage - 1, currentPage, currentPage + 1].filter(
      (p) => p > 1 && p < totalPages
    );

    pageButtons.push(...pagesToShow);

    if (currentPage < totalPages - 2) {
      pageButtons.push("...");
    }

    pageButtons.push(totalPages);
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div className="flex gap-2 items-center">
        <Link
          href={getPageLink(Math.max(1, currentPage - 1))}
          className="hidden md:flex btn btn-sm"
          aria-disabled={currentPage === 1}
        >
          Prev
        </Link>

        {pageButtons.map((item, idx) =>
          typeof item === "number" ? (
            <Link
              key={idx}
              href={getPageLink(item)}
              className={`btn btn-sm ${item === currentPage ? "btn-primary" : "btn-outline"}`}
            >
              {item}
            </Link>
          ) : (
            <span key={idx} className="px-2 text-gray-500">
              ...
            </span>
          )
        )}

        <Link
          href={getPageLink(Math.min(totalPages, currentPage + 1))}
          className="hidden md:flex btn btn-sm"
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
