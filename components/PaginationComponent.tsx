"use client";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ShadcnPagination className="mt-4">
      <PaginationContent className="gap-8">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(currentPage - 1, 1));
            }}
          />
        </PaginationItem>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.min(currentPage + 1, totalPages));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
