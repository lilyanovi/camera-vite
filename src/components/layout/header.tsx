import { Links, StatusLoading } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectStatusLoading } from '../../store/cameras-process/cameras-process.selectors';
import { selectStatusLoadingCheck } from '../../store/cart-process/cart-process.selectors';
import { selectStatusLoadingPost } from '../../store/order-process/order-process.selectors';
import { selectStatusLoadingReview } from '../../store/review-process/review-process.selectors';
import CartIcon from '../cart/cart-icon';
import Loader from '../loader/loader';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import Search from '../search/search';

function Header(): JSX.Element {

  const statusLoadingPost = useAppSelector(selectStatusLoadingPost);
  const statusLoadingCatalog = useAppSelector(selectStatusLoading);
  const statusLoadingCheck = useAppSelector(selectStatusLoadingCheck);
  const statusLoadingReview = useAppSelector(selectStatusLoadingReview);

  const isLoading = (statusLoadingPost || statusLoadingCatalog || statusLoadingCheck || statusLoadingReview) === StatusLoading.Loading;

  return (
    <header className="header" id="header" data-testid="header-container">
      <div className="container">
        <Logo />
        <nav className="main-nav header__main-nav">
          <Navigation links={Links.Navigation}/>
        </nav>
        <Search />
        <CartIcon />
      </div>
      {isLoading ? <Loader /> : ''}
    </header>
  );
}

export default Header;
