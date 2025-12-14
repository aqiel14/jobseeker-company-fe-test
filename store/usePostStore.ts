import { create } from "zustand";
import { Post } from "@/types/post";

interface PostStore {
  posts: Post[];

  setPosts: (posts: Post[]) => void;
  clearPosts: () => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),
  clearPosts: () => set({ posts: [] }),
}));

export default usePostStore;
