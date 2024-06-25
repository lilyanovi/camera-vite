import { useAppSelector } from '../../hooks';
import { selectCameras } from '../../store/cameras-process/cameras-process.selectors';
import { TCamera } from '../../types/camera';
import { getFilteredCameras } from '../../utils';
import SearchList from './search-list';
import { ChangeEvent, useState } from 'react';

function Search (): JSX.Element {
  const [filteredCameras, setFilteredCameras] = useState<TCamera[]>([]);
  const [value, setValue] = useState('');
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const cameras = useAppSelector(selectCameras);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    if(isFirstSearch){
      if(cameras.length > 0 && evt.target.value.length > 2) {
        setFilteredCameras(getFilteredCameras(cameras, evt.target.value));
        setIsFirstSearch(false);
      }
    } else {
      setFilteredCameras(getFilteredCameras(cameras, evt.target.value));
    }
  };

  const handleButtonClick = () => {
    setFilteredCameras([]);
    setValue('');
    setIsFirstSearch(true);
  };

  return (
    <div className={`form-search${value.length > 0 ? ' list-opened' : ''}`}>
      <form tabIndex={0}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            value={value}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleInputChange}
          />
        </label>
        {filteredCameras.length > 0 ? <SearchList filteredCameras={filteredCameras}/> : ''}
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleButtonClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default Search;
