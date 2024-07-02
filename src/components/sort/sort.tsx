import { START_PAGE, SortDirections, SortOption } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCurrentPage, changeSortDirection, changeSortOption } from '../../store/cameras-process/cameras-process.slice';
import { selectCurrentPage, selectSortDirection, selectSortOption } from '../../store/cameras-process/cameras-process.selectors';

function Sort (): JSX.Element {

  const dispatch = useAppDispatch();
  const checkedSort = useAppSelector(selectSortOption);
  const checkedDirection = useAppSelector(selectSortDirection);
  const currentPage = useAppSelector(selectCurrentPage);

  const handleSortChange = (option: SortOption) => {
    dispatch(changeSortOption({sort: option}));
    if(currentPage !== START_PAGE){
      dispatch(changeCurrentPage({currentPage: START_PAGE}));
    }
  };

  const handleDirectionChange = (sortDirection: SortDirections) => {
    dispatch(changeSortDirection({direction: sortDirection}));
    if(currentPage !== START_PAGE){
      dispatch(changeCurrentPage({currentPage: START_PAGE}));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {(Object.keys(SortOption) as Array<keyof typeof SortOption>).map((option) => (
              <div className="catalog-sort__btn-text" key={option}>
                <input
                  type="radio"
                  id={option}
                  name="sort"
                  checked={checkedSort === SortOption[option]}
                  onChange={() => handleSortChange(SortOption[option])}
                />
                <label htmlFor={option}>{SortOption[option]}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {(Object.keys(SortDirections) as Array<keyof typeof SortDirections>).map((direction) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${direction}`} key={direction}>
                <input
                  type="radio"
                  id={direction}
                  name="sort-icon"
                  checked={checkedDirection === SortDirections[direction]}
                  onChange={() => handleDirectionChange(SortDirections[direction])}
                  aria-label={SortDirections[direction]}
                />
                <label htmlFor={direction}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sort;
