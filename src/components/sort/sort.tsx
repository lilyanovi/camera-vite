import { useEffect, useState } from 'react';
import { SortDirections, SortOption } from '../../const';
import { useAppDispatch } from '../../hooks';
import { sortCameras } from '../../store/cameras-process/cameras-process.slice';

function Sort (): JSX.Element {

  const [checkedSort, setCheckedSort] = useState<SortOption>(SortOption.sortPrice);
  const [checkedDirection, setCheckedDirection] = useState<SortDirections>(SortDirections.up);

  const dispatch = useAppDispatch();

  const handleSortChange = (option: SortOption) => {
    setCheckedSort(option);
  };

  const handleDirectionChange = (direction: SortDirections) => {
    setCheckedDirection(direction);
  };

  useEffect(() => {
    dispatch(sortCameras({sort: checkedSort, direction: checkedDirection}));
  }, [checkedDirection, checkedSort, dispatch]);

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
