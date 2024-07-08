import { KeyboardEvent, useRef, useState } from 'react';
import { TCamera } from '../../types/camera';
import SearchItem from './search-item';

type SearchListProps = {
  filteredCameras: TCamera[];
}

function SearchList ({filteredCameras}: SearchListProps): JSX.Element {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [focusedCamera, setFocusedCamera] = useState<number>(0);

  const handleKeyDown = (evt: KeyboardEvent<HTMLUListElement>) => {
    switch(evt.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        if(containerRef.current){
          const newFocusedIndex = focusedCamera - 1;
          if(newFocusedIndex >= 0){
            (containerRef.current.children.item(newFocusedIndex) as HTMLElement).focus();
            setFocusedCamera(newFocusedIndex);
          }
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if(containerRef.current){
          const newFocusedIndex = focusedCamera + 1;
          if(newFocusedIndex < containerRef.current.children.length){
            (containerRef.current.children.item(newFocusedIndex) as HTMLElement).focus();
            setFocusedCamera(newFocusedIndex);
          }
        }
        break;
    }
  };

  return (
    <ul className="form-search__select-list" data-testid="search-list-container" ref={containerRef} onKeyDown={handleKeyDown}>
      {filteredCameras.map((camera) => <SearchItem camera={camera} key={camera.id}/>)}
    </ul>
  );
}

export default SearchList;
