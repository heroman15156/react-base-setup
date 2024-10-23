type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type { Post, Comment };
