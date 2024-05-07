import { create } from "zustand";

interface CommentProps {
  mode: "REPLY" | "CREATE";
  userId: string;
  commentId: string;
  setMode: (mode: "CREATE" | "REPLY") => void;
  setUserId: (userId: string) => void;
  setCommentId: (id: string) => void;
}

const useCommentType = create<CommentProps>((set) => ({
  mode: "CREATE",
  userId: "",
  commentId: "",
  setMode: (mode: "CREATE" | "REPLY") => set({ mode }),
  setUserId: (userId: string) => set({ userId }),
  setCommentId: (id: string) => set({ commentId: id }),
}));

export default useCommentType;
