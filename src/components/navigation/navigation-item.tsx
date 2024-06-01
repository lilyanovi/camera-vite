import { Link } from 'react-router-dom';

type NavigationItemProps = {
  navigationItem: {
    link: string;
    name: string;
  };
  isFooter?: boolean;
}

function NavigationItem({navigationItem, isFooter}: NavigationItemProps): JSX.Element {
  const {link, name} = navigationItem;
  return (
    <li
      className={`${isFooter ? 'footer' : 'main-nav'}__item`}
      data-testid="navigation-item-container"
    >
      <Link className={`${isFooter ? '' : 'main-nav__'}link`} to={link}>{name}
      </Link>
    </li>
  );
}

export default NavigationItem;
