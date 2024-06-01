import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  isFooter?: boolean;
}

function Logo ({isFooter}: LogoProps): JSX.Element {
  return (
    <Link
      className={`${isFooter ? 'footer' : 'header'}__logo`}
      to={AppRoute.Main}
      aria-label="Переход на главную"
      data-testid="logo-container"
    >
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={`#icon-logo${isFooter ? '-mono' : ''}`}></use>
      </svg>
    </Link>
  );
}

export default Logo;
