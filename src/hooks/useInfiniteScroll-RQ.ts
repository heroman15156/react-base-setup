import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { unsplashQueryKey } from "../constants/queryKeys.ts";
import { getImages } from "../servies/unsplashService.ts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { UnsplashImage } from "../type/Unsplash.ts";

type PageData = {
  images: UnsplashImage[];
  total: number;
  totalPages: number;
};

type TQueryFnData = PageData;
type TError = Error;
type TData = InfiniteData<TQueryFnData>;
type TQueryKey = readonly [string, ...unknown[]];
type TPageParam = number;

/*
 **** useInfiniteQuery 속성
 * fetchNextPage: 다음 페이지의 데이터를 가져오는 함수
 * hasNextPage:다음 페이지가 있는지 여부를 나타내는 불리언 값
 * isFetching:  현재 데이터를 가져오고 있는 중인지를 나타내는 불리언 값. 초기 로딩이나 백그라운드 리페치 모두에 해당
 * isFetchingNextPage: 다음 페이지를 가져오고 있는 중인지를 나타내는 불리언 값 ,fetchNextPage 실행 시 true
 * allPages 현재까지 가져온 모든 페이지의 데이터 배열 (PageData[])
 * lastPage: 마지막으로 가져온 페이지의 데이터.
 * */

const useInfiniteScrollRQ = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<TQueryFnData, TError, TData, TQueryKey, TPageParam>({
      queryKey: unsplashQueryKey.list.queryKey,
      queryFn: getImages,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const { totalPages } = lastPage;
        const nextPage = allPages.length + 1;
        return nextPage <= totalPages ? nextPage : undefined;
      },
    });

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const images = data?.pages.flatMap((page) => page.images) || [];

  return {
    images,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    ref,
    inView,
  };
};

export default useInfiniteScrollRQ;
