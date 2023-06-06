import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchAPI } from '../fetchAPI/fetchAPI';

const InfiniteScrolling = ({
  children,
  observerOptions = {}
}) => {
  const loaderElemRef = useRef();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery('articles', fetchAPI, {
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { ...observerOptions });

    if (loaderElemRef.current) {
      observer.observe(loaderElemRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, observerOptions, fetchNextPage]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="infinite-scrolling">
        {children({ modifiedDataArrayList : data.pages.flatMap(page => page.data) })}
      </div>
      <div ref={loaderElemRef}></div>
    </div>
  )
}

export default InfiniteScrolling;

