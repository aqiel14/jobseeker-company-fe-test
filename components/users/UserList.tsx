import { User } from "@/types/user";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface UserListProps {
  users: User[];
  onDelete: (userId: number) => void;
}

const UserList = ({ users, onDelete }: UserListProps) => {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="shadow-sm">
          <CardContent>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm">{user.username}</p>
            <p className="text-sm">{user.companyName}</p>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
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
              size="lg"
              variant="default"
              onClick={() => router.push(`/users/${user.id}`)}
            >
              <IconEdit size={16} />
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => onDelete(user.id)}
            >
              <IconTrash size={16} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
