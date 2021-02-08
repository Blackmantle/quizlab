export type Post = {
  id: string;
  username: string;
  body: string;
  date: number;
  likes: string[];
};

export type AddPostPayload = Omit<Post, 'likes'>;

export type AddLikePayload = {
  postId: string;
  username: string;
};
