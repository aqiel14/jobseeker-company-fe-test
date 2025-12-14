"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface PostListSkeletonProps {
  count?: number;
}

const PostListSkeleton = ({ count = 6 }: PostListSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader className="flex items-center gap-3">
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostListSkeleton;
