//import { useRef } from 'react';
import { TCamera } from '../../types/camera';
import SearchItem from './search-item';

type SearchListProps = {
  filteredCameras: TCamera[];
}

function SearchList ({filteredCameras}: SearchListProps): JSX.Element {
  /*const searchRef = useRef(null);

  document.addEventListener('keydown', (evt) => {
  console.log(searchRef.current !== null ? searchRef.current.children : "null")
  console.log(document.activeElement)
  console.log(Array.from(searchRef.current.childNodes))
  console.log(Array.from(searchRef.current.childNodes).findIndex((child) => child.outerHTML === document.activeElement))
    switch(evt.key) {
      case 'ArrowUp':
        // Путешествие на север! (⬆️)
        break;
      case 'ArrowDown':
        // Движение на юг! (⬇️)
        break;
      case 'ArrowLeft':
        // Поворот на запад! (⬅️)
        break;
      case 'ArrowRight':
        // Путешествие на восток! (➡️)
        break;
    }
  });*/

  return (
    <ul className="form-search__select-list">
      {filteredCameras.map((camera) => <SearchItem camera={camera} key={camera.id}/>)}
    </ul>
  );
}

export default SearchList;
