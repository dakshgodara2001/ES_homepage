import React, { useEffect, useState, useRef } from 'react';

const InfiniteScrolling = ({
  dataArrayList,
  children,
  observerOptions = {},
  dataDisplayLimit = 10
}) => {
  const [itemList, setItemList] = useState([]);
  const [skip, setSkip] = useState(0);
  const loaderElemRef = useRef();

  useEffect(() => {
    const fetchItems = (start, end) => dataArrayList.slice(start, end);
    const newItems = fetchItems(skip, skip + dataDisplayLimit);
    setItemList((prev) => [...prev, ...newItems]);
  }, [skip, dataDisplayLimit, dataArrayList]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSkip((prev) => prev + dataDisplayLimit);
      }
    }, { ...observerOptions });

    if (loaderElemRef.current) {
      observer.observe(loaderElemRef.current);
    }

    return () => observer.disconnect();
  }, [dataDisplayLimit, observerOptions]);

  return (
    <div>
      <div className="infinite-scrolling">{children({ modifiedDataArrayList : itemList })}</div>
      <div ref={loaderElemRef}></div>
    </div>
  )
}

export default InfiniteScrolling;
