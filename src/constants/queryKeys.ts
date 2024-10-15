import { createQueryKeys } from "@lukemorales/query-key-factory";

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

export { unsplashQueryKey, randomQueryKey, postQueryKey, authQueryKeys };
