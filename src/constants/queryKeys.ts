import {
  createQueryKeys,
  createQueryKeyStore,
} from "@lukemorales/query-key-factory";

const authQueryKeys = createQueryKeys("auth", {
  profile: null,
  accessToken: null,
});

const unsplashQueryKey = createQueryKeys("unsplash", {
  list: null,
});

const randomQueryKey = createQueryKeys("random", {
  list: null,
});

const postQueryKey = createQueryKeys("post", {
  list: null,
});

const queryKeys = createQueryKeyStore({
  posts: {
    list: null,
    detail: (id: number) => [id],
    comments: (id: number) => [id],
  },
  comments: {
    list: (postId: number | null) => [{ postId }],
  },
  users: {
    list: null,
    detail: (id: number) => [id],
  },
});

export {
  unsplashQueryKey,
  randomQueryKey,
  postQueryKey,
  authQueryKeys,
  queryKeys,
};
