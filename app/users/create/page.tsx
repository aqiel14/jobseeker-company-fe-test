"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserForm } from "@/components/users/UserForm";
import { createUser, deleteUser } from "@/lib/userService";
import useUserStore from "@/store/useUserStore";
import { UserFormValues } from "@/types/user";
import { toast } from "sonner";

export default function CreateUserPage() {
  const { addUser, removeUser } = useUserStore();

  const handleCreate = async (values: UserFormValues) => {
    try {
      const newUser = await createUser(values);
      addUser(newUser);
      toast.success("User created successfully!", {
        action: {
          label: "Undo",
          onClick: async () => {
            removeUser(newUser.id);
            try {
              await deleteUser(newUser.id);
              toast.success("User deleted successfully");
            } catch {
              toast.error("Failed to delete user.");
            }
          },
        },
      });
    } catch (error) {
      toast.error("Failed to create user.");
    }
  };

  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="font-bold text-2xl">Create User</CardHeader>
        <CardContent>
          <UserForm onSubmit={handleCreate} />
        </CardContent>
      </Card>
    </div>
  );
}
