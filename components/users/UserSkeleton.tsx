"use client";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface UsersSkeletonProps {
  count?: number;
}

export function UserSkeleton({ count = 5 }: UsersSkeletonProps) {
  const skeletonRows = Array.from({ length: count });

  return (
    <>
      {/* Desktop Table Skeleton */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile List Skeleton */}
      <div className="block md:hidden space-y-2">
        {skeletonRows.map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-48 mb-1" />
            <Skeleton className="h-3 w-32" />
          </Card>
        ))}
      </div>
    </>
  );
}
