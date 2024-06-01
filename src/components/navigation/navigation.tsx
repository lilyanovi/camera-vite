import NavigationItem from './navigation-item';

type NavigationProps = {
  isFooter?: boolean;
  links: {
    name: string;
    link: string;
  }[];
}

function Navigation({isFooter, links}: NavigationProps): JSX.Element {
  return (
    <ul
      className={`${isFooter ? 'footer' : 'main-nav'}__list`}
      data-testid="navigate-container"
    >
      {links.map((link) => <NavigationItem isFooter={isFooter} navigationItem={link} key={link.name}/>)}
    </ul>
  );
}

export default Navigation;
