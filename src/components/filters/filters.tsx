import { ChangeEvent, useEffect, useState } from 'react';
import { Categories, Levels, Types } from '../../const';
import { useAppDispatch } from '../../hooks';
import { filterCameras, sortCameras } from '../../store/cameras-process/cameras-process.slice';
import { useSearchParams } from 'react-router-dom';
import { getQueryObject } from '../../utils';

function Filters (): JSX.Element {
  const [checkedTypes, setCheckedTypes] = useState<Types[]>([]);
  const [checkedLevels, setCheckedLevels] = useState<Levels[]>([]);
  const [checkedCategory, setCheckedCategory] = useState<Categories | null>(null);
  const [checkedPrice, setCheckedPrice] = useState<number | null>(null);
  const [checkedPriceUp, setCheckedPriceUp] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCheckedPrice(Number(evt.target.value));
  };

  const handlePriceUpChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCheckedPriceUp(Number(evt.target.value));
  };

  const handleCategoryChange = (category: Categories) => {
    setCheckedCategory(category);
    if(category === Categories.Videocamera){
      setCheckedTypes(checkedTypes.filter((type) => type !== Types.Snapshot && type !== Types.Film));
    }
  };

  const handleTypeChange = (type: Types) => {
    if(checkedTypes.includes(type)){
      setCheckedTypes(checkedTypes.filter((checkedType) => type !== checkedType));
    } else {
      setCheckedTypes([...checkedTypes, type]);
    }
  };

  const handleLevelChange = (level: Levels) => {
    if(checkedLevels.includes(level)){
      setCheckedLevels(checkedLevels.filter((checkedLevel) => level !== checkedLevel));
    } else {
      setCheckedLevels([...checkedLevels, level]);
    }
  };

  useEffect(() => {
    const settings = {
      price: checkedPrice,
      priceUp: checkedPriceUp,
      category: checkedCategory,
      type: checkedTypes,
      level: checkedLevels
    };
    dispatch(filterCameras(settings));
    dispatch(sortCameras());

    const queryObject = getQueryObject(settings);
    setSearchParams(queryObject);
  }, [dispatch, setSearchParams, checkedLevels, checkedCategory, checkedPrice, checkedPriceUp, checkedTypes]);

  useEffect(() => {
    if(searchParams.has('price')){
      setCheckedPrice(Number(searchParams.get('price')));
    }
    if(searchParams.has('priceUp')){
      setCheckedPriceUp(Number(searchParams.get('priceUp')));
    }
    if(searchParams.has('category')){
      setCheckedCategory(searchParams.get('category') as Categories);
    }
    if(searchParams.has('type')){
      setCheckedTypes(searchParams.get('type')?.split('+') as Types[]);
    }
    if(searchParams.has('level')){
      setCheckedLevels(searchParams.get('level')?.split('+') as Levels[]);
    }
  }, [searchParams]);

  const handleButtonClick = () => {
    setCheckedLevels([]);
    setCheckedCategory(null);
    setCheckedTypes([]);
    setCheckedPrice(null);
    setCheckedPriceUp(null);
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
                  placeholder="от"
                  value={checkedPrice ? checkedPrice : ''}
                  onChange={handlePriceChange}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                  value={checkedPriceUp ? checkedPriceUp : ''}
                  onChange={handlePriceUpChange}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          {(Object.keys(Categories) as Array<keyof typeof Categories>).map((category) => (
            <div className="custom-radio catalog-filter__item" key={category}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  checked={checkedCategory === Categories[category]}
                  onChange={() => handleCategoryChange(Categories[category])}
                /><span className="custom-radio__icon"></span><span className="custom-radio__label">{Categories[category]}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          {(Object.keys(Types) as Array<keyof typeof Types>).map((type) => (
            <div className="custom-checkbox catalog-filter__item" key={type}>
              <label>
                <input
                  type="checkbox"
                  name={type}
                  checked={checkedTypes.includes(Types[type])}
                  onChange={() => handleTypeChange(Types[type])}
                  disabled={checkedCategory === Categories.Videocamera && (Types[type] === Types.Snapshot || Types[type] === Types.Film)}
                /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{Types[type]}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          {(Object.keys(Levels) as Array<keyof typeof Levels>).map((level) => (
            <div className="custom-checkbox catalog-filter__item" key={level}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedLevels.includes(Levels[level])}
                  onChange={() => handleLevelChange(Levels[level])}
                  name={`${level === 'NonProfessional' ? 'non-professional' : level}`}
                /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{Levels[level]}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleButtonClick}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filters;
