import { Socials } from '../../const';
import SocialItem from './social-item';

function Social (): JSX.Element {
  return (
    <ul className="social">
      {Socials.map((social) => <SocialItem key={social.name} social={social}/>)}
    </ul>
  );
}

export default Social;
