"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import usePostStore from "@/store/usePostStore";
import useUserStore from "@/store/useUserStore";
import { getPostsByUser } from "@/lib/userService";
import EmptyState from "@/components/EmptyState";
import PostCard from "@/components/posts/PostCard";
import { PaginationComponent } from "@/components/PaginationComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostListSkeleton from "@/components/posts/PostListSkeleton";

export default function PostsPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const { posts, setPosts, clearPosts } = usePostStore();
  const { users, selectedUser, setSelectedUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const user = users.find((u) => u.id === userId);
    if (user) setSelectedUser(user);
  }, [users, userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      clearPosts();

      try {
        const data = await getPostsByUser(userId);
        setPosts(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const startIndex = (currentPage - 1) * perPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + perPage);

  const totalPages = Math.ceil(posts.length / perPage);

  return (
    <div className="min-h-[50vh] flex flex-col justify-center p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">
        Posts by {selectedUser?.name ?? `User ${userId}`}
      </h1>

      <Select
        value={String(perPage)}
        onValueChange={(value) => setPerPage(Number(value))}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="6">6</SelectItem>
          <SelectItem value="12">12</SelectItem>
        </SelectContent>
      </Select>

      {isLoading ? (
        <PostListSkeleton />
      ) : posts.length === 0 ? (
        <EmptyState thing={`Posts by ${selectedUser?.name}`} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedPosts.map((post) => (
              <PostCard post={post} user={selectedUser} key={post.id} />
            ))}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
