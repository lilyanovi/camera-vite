import { useEffect, useState } from 'react';
import { PAGINATION_PAGE_COUNT, PER_PAGE_CAMERAS_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentPage, selectFilteredCameras } from '../../store/cameras-process/cameras-process.selectors';
import { changeCurrentPage } from '../../store/cameras-process/cameras-process.slice';
import PaginationItem from './pagination-item';

function Pagination (): JSX.Element {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const filteredCameras = useAppSelector(selectFilteredCameras);
  const currentPage = useAppSelector(selectCurrentPage);

  const pageCount = Math.ceil(filteredCameras.length / PER_PAGE_CAMERAS_COUNT);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(pageCount >= PAGINATION_PAGE_COUNT){
      setVisiblePages(Array.from({length: PAGINATION_PAGE_COUNT }, (_, i) => i + 1));
    } else {
      setVisiblePages(Array.from({length: pageCount }, (_, i) => i + 1));
    }

  }, [pageCount, dispatch]);

  const handleNextPageClick = () => {
    const firstIndex = visiblePages[visiblePages.length - 1] + 1;
    dispatch(changeCurrentPage({currentPage: firstIndex}));
    const newPages = [];
    for(let i = firstIndex; i < firstIndex + PAGINATION_PAGE_COUNT; i++){
      if (i <= pageCount){
        newPages.push(i);
      }
    }
    setVisiblePages(newPages);
  };

  const handlePrevPageClick = () => {
    const lastIndex = visiblePages[0] - 1;
    dispatch(changeCurrentPage({currentPage: lastIndex}));
    const newPages = [];
    for(let i = lastIndex; i > lastIndex - PAGINATION_PAGE_COUNT; i--){
      if (i > 0){
        newPages.unshift(i);
      }
    }
    setVisiblePages(newPages);
  };

  const handleCurrentPageChange = (newPage: number) => {
    if(currentPage !== newPage){
      dispatch(changeCurrentPage({currentPage: newPage}));
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {!visiblePages?.includes(1) ?
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link&#45;&#45;text"
              onClick={handlePrevPageClick}
            >Назад
            </a>
          </li> : ''}
        {visiblePages.map((page) => <PaginationItem key={page} page={page} currentPage={currentPage} onChangePage={handleCurrentPageChange}/>)}
        {!visiblePages.includes(pageCount) ?
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link&#45;&#45;text"
              onClick={handleNextPageClick}
            >Далее
            </a>
          </li> : ''}
      </ul>
    </div>
  );
}

export default Pagination;
