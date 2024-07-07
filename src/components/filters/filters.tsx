import { ChangeEvent, useEffect, useState } from 'react';
import { Category, Level, START_PAGE, SortDirection, SortOption, Type } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCurrentPage, changeFilteredSettings, changeSortDirection, changeSortOption } from '../../store/cameras-process/cameras-process.slice';
import { useSearchParams } from 'react-router-dom';
import { getMinMaxPrice, getQueryObject } from '../../utils';
import { selectCurrentPage, selectFilteredCameras, selectFilteredSettings, selectSortDirection, selectSortOption } from '../../store/cameras-process/cameras-process.selectors';

function Filters (): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const filteredSettings = useAppSelector(selectFilteredSettings);
  const {price: checkedPrice, priceUp: checkedPriceUp, category: checkedCategory, type: checkedTypes, level: checkedLevels} = filteredSettings;

  const sort = useAppSelector(selectSortOption);
  const direction = useAppSelector(selectSortDirection);
  const filteredCameras = useAppSelector(selectFilteredCameras);
  const page = useAppSelector(selectCurrentPage);

  const [minMaxPrice, setMinMaxPrice] = useState(getMinMaxPrice(filteredCameras));

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilteredSettings({
      price: Number(evt.target.value),
      priceUp: checkedPriceUp,
      category: checkedCategory,
      type: checkedTypes,
      level: checkedLevels,
    }));
    dispatch(changeCurrentPage({currentPage: START_PAGE}));
  };

  const handlePriceBlur = () => {
    if(checkedPrice && checkedPrice < Number(minMaxPrice.min)) {
      dispatch(changeFilteredSettings({
        price: Number(minMaxPrice.min),
        priceUp: checkedPriceUp,
        category: checkedCategory,
        type: checkedTypes,
        level: checkedLevels,
      }));
    }
  };

  const handlePriceUpChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilteredSettings({
      price: checkedPrice,
      priceUp: Number(evt.target.value),
      category: checkedCategory,
      type: checkedTypes,
      level: checkedLevels,
    }));
    dispatch(changeCurrentPage({currentPage: START_PAGE}));
  };

  const handlePriceUpBlur = () => {
    if(checkedPriceUp && checkedPriceUp > Number(minMaxPrice.max)) {
      dispatch(changeFilteredSettings({
        price: checkedPrice,
        priceUp: Number(minMaxPrice.max),
        category: checkedCategory,
        type: checkedTypes,
        level: checkedLevels,
      }));
    }
    if(checkedPrice && checkedPriceUp && checkedPrice > checkedPriceUp){
      dispatch(changeFilteredSettings({
        price: checkedPrice,
        priceUp: checkedPrice,
        category: checkedCategory,
        type: checkedTypes,
        level: checkedLevels,
      }));
    }
  };

  const handleCategoryChange = (category: Category) => {
    dispatch(changeFilteredSettings({
      price: checkedPrice,
      priceUp: checkedPriceUp,
      category: category,
      type: category === Category.Videocamera ? checkedTypes.filter((type) => type !== Type.Snapshot && type !== Type.Film) : checkedTypes,
      level: checkedLevels,
    }));
    setMinMaxPrice(getMinMaxPrice(filteredCameras));
    dispatch(changeCurrentPage({currentPage: START_PAGE}));
  };

  const handleTypeChange = (type: Type) => {
    dispatch(changeFilteredSettings({
      price: checkedPrice,
      priceUp: checkedPriceUp,
      category: checkedCategory,
      type: checkedTypes.includes(type) ? checkedTypes.filter((checkedType) => type !== checkedType) : [...checkedTypes, type],
      level: checkedLevels,
    }));
    setMinMaxPrice(getMinMaxPrice(filteredCameras));
    dispatch(changeCurrentPage({currentPage: START_PAGE}));
  };

  const handleLevelChange = (level: Level) => {
    dispatch(changeFilteredSettings({
      price: checkedPrice,
      priceUp: checkedPriceUp,
      category: checkedCategory,
      type: checkedTypes,
      level: checkedLevels.includes(level) ? checkedLevels.filter((checkedLevel) => level !== checkedLevel) : [...checkedLevels, level],
    }));
    setMinMaxPrice(getMinMaxPrice(filteredCameras));
    dispatch(changeCurrentPage({currentPage: START_PAGE}));
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const settings = {
        price: checkedPrice,
        priceUp: checkedPriceUp,
        category: checkedCategory,
        type: checkedTypes,
        level: checkedLevels,
      };

      const queryObject = getQueryObject(settings, sort, direction, page);
      setSearchParams(queryObject);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, setSearchParams, checkedLevels, checkedCategory, checkedPrice, checkedPriceUp, checkedTypes, sort, direction, page]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(changeFilteredSettings({
        price: searchParams.has('price') ? Number(searchParams.get('price')) : null,
        priceUp: searchParams.has('priceUp') ? Number(searchParams.get('priceUp')) : null,
        category: searchParams.has('category') ? searchParams.get('category') as Category : null,
        type: searchParams.has('type') ? searchParams.get('type')?.split('+') as Type[] : [],
        level: searchParams.has('level') ? searchParams.get('level')?.split('+') as Level[] : [],
      }));

      if(searchParams.has('sort')){
        dispatch(changeSortOption({sort: searchParams.get('sort') as SortOption}));
      }
      if(searchParams.has('direction')){
        dispatch(changeSortDirection({direction: searchParams.get('direction') as SortDirection}));
      }
      if(searchParams.has('page')){
        dispatch(changeCurrentPage({currentPage: Number(searchParams.get('page'))}));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, searchParams]);

  const handleButtonClick = () => {
    dispatch(changeFilteredSettings({
      price: null,
      priceUp: null,
      category: null,
      type: [],
      level: [],
    }));
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={minMaxPrice.min}
                  value={checkedPrice ? checkedPrice : ''}
                  onChange={handlePriceChange}
                  onBlur={handlePriceBlur}
                  tabIndex={0}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={minMaxPrice.max}
                  value={checkedPriceUp ? checkedPriceUp : ''}
                  onChange={handlePriceUpChange}
                  onBlur={handlePriceUpBlur}
                  tabIndex={0}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          {(Object.keys(Category) as Array<keyof typeof Category>).map((category) => (
            <div className="custom-radio catalog-filter__item" key={category}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  checked={checkedCategory === Category[category]}
                  onChange={() => handleCategoryChange(Category[category])}
                  tabIndex={0}
                /><span className="custom-radio__icon"></span><span className="custom-radio__label">{Category[category]}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          {(Object.keys(Type) as Array<keyof typeof Type>).map((type) => (
            <div className="custom-checkbox catalog-filter__item" key={type}>
              <label>
                <input
                  type="checkbox"
                  name={type}
                  checked={checkedTypes.includes(Type[type])}
                  onChange={() => handleTypeChange(Type[type])}
                  disabled={checkedCategory === Category.Videocamera && (Type[type] === Type.Snapshot || Type[type] === Type.Film)}
                  tabIndex={0}
                /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{Type[type]}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          {(Object.keys(Level) as Array<keyof typeof Level>).map((level) => (
            <div className="custom-checkbox catalog-filter__item" key={level}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedLevels.includes(Level[level])}
                  onChange={() => handleLevelChange(Level[level])}
                  name={`${level === 'NonProfessional' ? 'non-professional' : level}`}
                  tabIndex={0}
                /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{Level[level]}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleButtonClick}
          tabIndex={0}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filters;
