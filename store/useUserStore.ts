import { create } from "zustand";
import { User } from "@/types/user";

type UserUpdate = Partial<User> & { id: number };

interface UserStore {
  users: User[];
  selectedUser: User | null;

  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: UserUpdate) => void;
  removeUser: (id: number) => void;
  setSelectedUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,

  setUsers: (users) => set({ users }),

  addUser: (user) => set((state) => ({ users: [user, ...state.users] })),

  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? { ...u, ...user } : u)),
      selectedUser:
        state.selectedUser?.id === user.id
          ? { ...state.selectedUser, ...user }
          : state.selectedUser,
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
    })),

  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export default useUserStore;
