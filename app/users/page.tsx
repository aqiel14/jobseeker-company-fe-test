"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import { deleteUser, getUsers } from "@/lib/userService";
import { UsersTable } from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import UserList from "@/components/users/UserList";
import { UserSkeleton } from "@/components/users/UserSkeleton";
import { PaginationComponent } from "@/components/PaginationComponent";

export default function UsersPage() {
  const router = useRouter();
  const { users, setUsers, removeUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();

      const mappedUsers = fetchedUsers.map((user) => ({
        ...user,
        companyName: user.company?.name ?? "",
      }));

      setUsers(mappedUsers);
      setIsLoading(false);
    };

    fetchUsers();
  }, [users.length, setUsers]);

  const handleDelete = async (userId: number) => {
    const previousUsers = users;
    removeUser(userId);
    toast.info("Deleting user...");

    try {
      await deleteUser(userId);
      toast.success("User deleted successfully", {
        action: {
          label: "Undo",
          onClick: () => setUsers(previousUsers),
        },
      });
    } catch {
      setUsers(previousUsers);
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + perPage);

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  return (
    <div className="min-h-[50vh] flex flex-col justify-center p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <Button
          size={"lg"}
          className="min-w-32"
          onClick={() => router.push("/users/create")}
        >
          Create
        </Button>
      </div>

      <div className="my-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-64"
        />

        <Select
          value={String(perPage)}
          onValueChange={(value) => setPerPage(Number(value))}
        >
          <SelectTrigger className="w-full max-w-60 md:w-16 my-2 md:my-0">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent className="w-full md:min-w-4 md:w-16">
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <UserSkeleton count={perPage} />
      ) : users.length === 0 ? (
        <EmptyState thing="User" />
      ) : (
        <>
          <div className="hidden md:block">
            <UsersTable onDelete={handleDelete} users={paginatedUsers} />
          </div>
          <div className="block md:hidden">
            <UserList onDelete={handleDelete} users={paginatedUsers} />
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
