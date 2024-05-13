type SocialItemProps = {
  social: {
    name: string;
    label: string;
  };
}

function SocialItem ({social}: SocialItemProps): JSX.Element {

  const {name, label} = social;

  console.log(social)
  return (
    <li className="social__item">
      <a className="link" href="#" aria-label={label}>
        <svg width="20" height="20" aria-hidden="true">
          <use xlinkHref={`#icon-${name}`}></use>
        </svg>
      </a>
    </li>
  );
}

export default SocialItem;
