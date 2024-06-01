import { Socials } from '../../const';
import SocialItem from './social-item';

function Social (): JSX.Element {
  return (
    <ul className="social" data-testid="social-container">
      {Socials.map((social) => <SocialItem key={social.name} social={social}/>)}
    </ul>
  );
}

export default Social;
