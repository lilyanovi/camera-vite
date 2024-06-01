import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function Layout () : JSX.Element {
  return (
    <div className='wrapper' data-testid="layout-container">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default Layout;
