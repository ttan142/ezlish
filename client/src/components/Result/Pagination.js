import React, { useState } from "react";

const Pagination = ({
  resultsPerPage,
  totalResults,
  paginate,
  currentPage,
}) => {
  const pageNumbers = []; //Numbers

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleNextbtn = () => {

    if(currentPage===pageNumbers[pageNumbers.length-1]){return;}else{
    paginate(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }
  };

  const handlePrevbtn = () => {
    if(currentPage===pageNumbers[0]){return;}else{
    paginate(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = <a id="but" onClick={handleNextbtn}> &hellip; </a>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <a id="but" onClick={handlePrevbtn}> &hellip; </a>;
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <a id="but"
          onClick={() => {
            paginate(number);
          }}
          className={currentPage === number ? "active" : "page-link"}
        >
          {number}
        </a>
      );
    } else {
      return null;
    }
  });
  return (
    <>
      <div className="pagin">
        <a id="but"
        disabled={currentPage === pageNumbers[0] ? true : false}
          onClick={handlePrevbtn}
          
        >
          Prev
        </a>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <a id="but"
         disabled={
          currentPage === pageNumbers[pageNumbers.length-1] ? true : false
        }
          onClick={handleNextbtn}
         
        >
          Next
        </a>
      </div>
    </>
  );
};

export default Pagination;
