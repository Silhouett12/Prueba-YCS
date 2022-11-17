import React from "react";
import './index.css'

const Pages = ({ photosPerPage, allPhotos, pages }: any) => {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allPhotos / photosPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <>
      <div className="pages">
        {pageNumber?.map((number, i) => {
          return (
            <li key={i} className='list'>
              <button onClick={() => pages(number)}>
                {number}
              </button>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Pages;
