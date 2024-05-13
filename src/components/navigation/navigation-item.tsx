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
    <li className={`${isFooter ? 'footer' : 'main-nav'}__item`}>
      <a className={`${isFooter ? '' : 'main-nav__'}link`} href={link}>{name}
      </a>
    </li>
  );
}

export default NavigationItem;
