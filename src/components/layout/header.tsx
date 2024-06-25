import { Links } from '../../const';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import Search from '../search/search';

function Header(): JSX.Element {

  return (
    <header className="header" id="header" data-testid="header-container">
      <div className="container">
        <Logo />
        <nav className="main-nav header__main-nav">
          <Navigation links={Links.Navigation}/>
        </nav>
        <Search />
      </div>
    </header>
  );
}

export default Header;
