"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteConfirm from "../DeleteConfirm";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
  onDelete: (userId: number) => void;
}

export function UsersTable({ onDelete, users }: UsersTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {user.email}
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.companyName}</TableCell>
            <TableCell className="flex items-center justify-end gap-2">
              <Button
                size={"lg"}
                variant={"default"}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/users/${user.id}/posts`);
                }}
              >
                View Posts
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/users/${user.id}`);
                }}
              >
                <IconEdit size={16} />
              </Button>

              <DeleteConfirm
                title="Delete User"
                description={`Are you sure you want to delete ${user.name}?`}
                onConfirm={() => onDelete(user.id)}
              >
                <Button
                  onClick={(e) => e.stopPropagation()}
                  size="lg"
                  variant={"destructive"}
                >
                  <IconTrash size={16} />
                </Button>
              </DeleteConfirm>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
