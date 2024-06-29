import { useEffect, useState } from 'react';
import { TCamera } from '../../types/camera';
import { ActiveTabs } from '../../const';
import { useSearchParams } from 'react-router-dom';

type TabsProps = Pick<TCamera, 'vendorCode' | 'category' | 'type' | 'level' | 'description'>;

function Tabs ({vendorCode, category, type, level, description}: TabsProps): JSX.Element {
  const [isActive, setIsActive] = useState<ActiveTabs>(ActiveTabs.Description);
  const [searchParams, setSearchParams] = useSearchParams();

  const isCharacteristics = isActive === ActiveTabs.Characteristics;

  const handleCharacteristicsClick = () => {
    setIsActive(ActiveTabs.Characteristics);
  };

  const handleDescriptionClick = () => {
    setIsActive(ActiveTabs.Description);
  };

  useEffect(() => {
    const settings = {
      tab: isActive,
    };
    setSearchParams(settings);
  }, [setSearchParams, isActive]);

  useEffect(() => {
    if(searchParams.has('tab')){
      setIsActive(searchParams.get('tab') as ActiveTabs);
    }
  }, [searchParams]);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${isCharacteristics ? 'is-active' : ''}`}
          type="button"
          onClick={handleCharacteristicsClick}
        >Характеристики
        </button>
        <button
          className={`tabs__control ${isCharacteristics ? '' : 'is-active'}`}
          type="button"
          onClick={handleDescriptionClick}
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${isCharacteristics ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${isCharacteristics ? '' : 'is-active'}`}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
