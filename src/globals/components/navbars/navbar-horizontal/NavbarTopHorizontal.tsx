import { Navbar } from 'react-bootstrap';
import { useAppContext } from 'globals/providers/AppProvider';
import classNames from 'classnames';
import NavbarBrand from 'globals/components/navbars/nav-items/NavbarBrand';
import NavItemsSlim from 'globals/components/navbars/nav-items/NavItemsSlim';
import NavItems from 'globals/components/navbars/nav-items/NavItems';
import NavbarTopNav from './NavbarTopNav';
import { useBreakpoints } from 'globals/providers/BreakpointsProvider';

const NavbarTopHorizontal = () => {
  const {
    config: {
      navbarPosition,
      openNavbarVertical,
      navbarTopShape,
      navbarTopAppearance
    }
  } = useAppContext();

  const { breakpoints } = useBreakpoints();

  return (
    <Navbar
      className={classNames('navbar-top fixed-top', {
        'navbar-slim': navbarTopShape === 'slim'
      })}
      expand="lg"
      variant=""
      data-navbar-appearance={navbarTopAppearance === 'darker' ? 'darker' : ''}
    >
      <NavbarBrand />
      {!(navbarPosition === 'combo' && breakpoints.down('lg')) && (
        <Navbar.Collapse
          className="navbar-top-collapse order-1 order-lg-0 justify-content-center pb-0"
          in={openNavbarVertical}
        >
          <NavbarTopNav />
        </Navbar.Collapse>
      )}
      {navbarTopShape === 'default' ? <NavItems /> : <NavItemsSlim />}
    </Navbar>
  );
};

export default NavbarTopHorizontal;
