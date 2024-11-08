export type PostType = {
  author: {
    id: number;
    username: string;
  };
  _count: {
    comments: number;
  };
  status: "PUBLISHED" | "UNPUBLISHED";
  id: number;
  authorId: number;
  title: string;
  text: string;
  createdAt: Date;
};

export type UserType = {
  username: string;
  role: Role;
  numOfPosts: number;
  numOfComments: number;
};

export type CommentType = {
  author: {
    username: string;
  };
  postId: number;
  id: number;
  authorId: number;
  text: string;
  createdAt: Date;
};
