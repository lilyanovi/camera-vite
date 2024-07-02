type PaginationItemProps = {
  page: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

function PaginationItem ({page, currentPage, onChangePage}: PaginationItemProps): JSX.Element {
  return (
    <li className="pagination__item">
      <a className={`pagination__link${currentPage === page ? ' pagination__link--active' : ''}`} onClick={() => onChangePage(page)}>{page}</a>
    </li>
  );
}

export default PaginationItem;
