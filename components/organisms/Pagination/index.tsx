import * as fas from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import clsx from 'classnames'

export default function Component({ items, setPagedItems, filter }: Partial<{
  items: any,
  pagedItems: any,
  setPagedItems: any,
  filter: any,
}>) {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(
      Math.ceil(
        items?.filter((item: any) => filter?.price ? item.price < filter?.price : item).length / limit
      )
    );
    setPagedItems(
      items
        ?.filter((item: any) => filter?.price ? item.price < filter?.price : item)
        .slice((0 + page - 1) * limit, limit * page)
    );
  }, [items, filter?.price, page, limit]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="flex items-center flex-shrink-0 mt-9">
      {page !== 1 && (
        <button
          className="bg-white rounded-lg py-3 px-4 mr-4"
          onClick={() => setPage((prev) => prev - 1)}
        >
          <FontAwesomeIcon
            icon={fas.faChevronLeft}
            className="w-3 text-indigo-500"
          />
        </button>
      )}
      {[...Array(totalPages)].map((el, id) => (
        <button
          key={id}
          className={clsx(
            'font-medium py-2.5 px-4 mx-2 rounded-lg transition-all hover:bg-indigo-500 hover:text-white',
            page === id + 1
              ? 'bg-indigo-500 text-white'
              : 'bg-white text-indigo-500'
          )}
          onClick={() => setPage(id + 1)}
        >
          {id + 1}
        </button>
      ))}
      {page !== totalPages && totalPages !== 0 && (
        <button
          className="bg-white rounded-lg py-3 px-4 ml-4"
          onClick={() => setPage((prev) => prev + 1)}
        >
          <FontAwesomeIcon
            icon={fas.faChevronRight}
            className="w-3 text-indigo-500"
          />
        </button>
      )}
    </div>
  );
}