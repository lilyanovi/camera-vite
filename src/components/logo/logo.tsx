type LogoProps = {
  isFooter?: boolean;
}

function Logo ({isFooter}: LogoProps): JSX.Element {
  return (
    <a className={`${isFooter ? 'footer' : 'header'}__logo`} href="index.html" aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={`#icon-logo${isFooter ? '-mono' : ''}`}></use>
      </svg>
    </a>
  );
}

export default Logo;
