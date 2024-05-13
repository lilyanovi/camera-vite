import Logo from '../logo/logo';
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
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">Каталог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Гарантии
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Доставка
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">О компании
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
