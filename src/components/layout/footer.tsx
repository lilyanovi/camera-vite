import { Links } from '../../const';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import Social from '../social/social';

function Footer(): JSX.Element {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Logo isFooter />
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <Social />
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <Navigation isFooter links={Links.Navigation}/>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <Navigation isFooter links={Links.Resources}/>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <Navigation isFooter links={Links.Support}/>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
