import React from 'react';
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const PaginationToolbar = ({
  totalPages,
  page,
  onChange,
  nextPage,
  previousPage,
  totalRecords,
}) => {
  const getSelectOptions = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages.map((page, index) => {
      return <option key={index} value={`${page}`}>{`${page}`}</option>;
    });
  };
  return (
    <div className='customers__pagination'>
      <p>Page</p>
      <button className='button bg-gray' onClick={previousPage}>
        Back
      </button>
      <select
        value={page}
        onChange={onChange}
        className='customers__select-page'
      >
        {getSelectOptions()}
      </select>
      <button className='button bg-gray' onClick={nextPage}>
        Next
      </button>
      <p>| Found total of {numberWithCommas(totalRecords)} records.</p>
    </div>
  );
};

export default PaginationToolbar;
