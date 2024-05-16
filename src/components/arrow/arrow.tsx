function Arrow (): JSX.Element {
  const handleArrowClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      className="up-btn"
      href="#header"
      onClick={handleArrowClick}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

export default Arrow;
