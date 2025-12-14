"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserForm } from "@/components/users/UserForm";
import { updateUser } from "@/lib/userService";
import useUserStore from "@/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserFormValues {
  name: string;
  email: string;
}

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { users, updateUser: updateUserState } = useUserStore();

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return <p>User not found</p>;
  }

  const handleUpdate = async (values: UserFormValues) => {
    const previousUser = users.find((u) => u.id === user.id);

    updateUserState({ ...user, ...values });

    try {
      await updateUser(user.id, values);
      toast.success("User updated successfully", {
        action: {
          label: "Undo",
          onClick: () => previousUser && updateUserState(previousUser),
        },
      });
    } catch (error) {
      if (previousUser) updateUserState(previousUser);
      toast.error("Failed to update user.");
    }

    router.push("/users");
  };

  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="font-bold text-2xl">Edit User</CardHeader>
        <CardContent>
          <UserForm user={user} onSubmit={handleUpdate} />
        </CardContent>
      </Card>
    </div>
  );
}
