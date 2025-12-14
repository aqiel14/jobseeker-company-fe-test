import { Card, CardContent, CardHeader } from "../ui/card";
import { Post } from "@/types/post";
import { User } from "@/types/user";

interface PostCardProps {
  post: Post;
  user: User | null;
}

const PostCard = ({ post, user }: PostCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = user ? getInitials(user.name) : post.userId.toString();

  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <div>
          <p className="font-semibold">{user?.name ?? `User ${post.userId}`}</p>
          <p className="text-xs text-gray-500">
            @{user?.username ?? `user${post.userId}`}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{post.title}</p>
        <p>{post.body}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
