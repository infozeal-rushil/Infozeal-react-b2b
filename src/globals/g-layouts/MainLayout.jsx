import classNames from 'classnames';
import NavbarTopDefault from '@globals/g-components/navbars/navbar-top/NavbarTopDefault';
import NavbarVertical from '@globals/g-components/navbars/navbar-vertical/NavbarVertical';
import { useAppContext } from '@globals/g-providers/AppProvider';
import { useMainLayoutContext } from '@globals/g-providers/MainLayoutProvider';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  const {
    config: { navbarPosition }
  } = useAppContext();
  const { contentClass } = useMainLayoutContext();
  return (
    <div className="d-flex">
      <Container fluid className="px-0 main-content">
        {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
          <NavbarVertical />
        )}
        {navbarPosition === 'vertical' && <NavbarTopDefault />}

        <div className={classNames(contentClass, 'content')}>
          <Outlet />
        </div>
      </Container>
    </div>
  );
};
export default MainLayout;
