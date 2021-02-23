import React, { useState, useEffect } from 'react';

const Pagination = ({ list, pageChanged, currentPage = 1, maxItems = 5 }) => {
  const [pages, setPages] = useState(null);
  useEffect(() => {}, []);
  useEffect(() => {
    if (list) {
      const pages = Math.ceil(list.length / maxItems);
      setPages(pages);
    }
  }, list);

  const onPageChanges = (x) => {
    pageChanged(x);
  };
  const renderPages = () => {
    let list = [];
    for (let i = -1; i < pages - 1; i++) {
      list.push(i + 1);
    }

    return list.map((index) => (
      <div
        className={`Pagination-container__item ${
          parseInt(index) === parseInt(currentPage)
            ? 'Pagination-container__selected'
            : null
        }`}
        onClick={() => onPageChanges(index)}
      >
        {index + 1}
      </div>
    ));
  };

  return <div className='Pagination-container'>{pages && renderPages()}</div>;
};

export default Pagination;
