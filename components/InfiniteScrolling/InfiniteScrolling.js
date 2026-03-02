import React, { useEffect, useRef, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchAPI } from '../fetchAPI/fetchAPI';

const InfiniteScrolling = ({
  children,
  initialData,
  styles,
  observerOptions
}) => {
  const loaderElemRef = useRef();
  const stableObserverOptions = useMemo(() => observerOptions || {}, [observerOptions]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery('articles', fetchAPI, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...(initialData && {
      initialData: {
        pages: [initialData],
        pageParams: [1]
      },
      staleTime: 60 * 1000
    })
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, stableObserverOptions);

    if (loaderElemRef.current) {
      observer.observe(loaderElemRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, stableObserverOptions, fetchNextPage]);

  if (isLoading) {
    return (
      <div className={styles?.loader}>
        <div className={styles?.spinner}></div>
        <span className={styles?.loadingText}>Loading articles...</span>
      </div>
    );
  }

  if (isError) {
    return <div className={styles?.error}>Error: {error.message}</div>;
  }

  return (
    <div>
      {children({ modifiedDataArrayList: data.pages.flatMap(page => page.data) })}
      {isFetchingNextPage && (
        <div className={styles?.loader}>
          <div className={styles?.spinner}></div>
          <span className={styles?.loadingText}>Loading more...</span>
        </div>
      )}
      <div ref={loaderElemRef} className={styles?.sentinel}></div>
    </div>
  )
}

export default InfiniteScrolling;
