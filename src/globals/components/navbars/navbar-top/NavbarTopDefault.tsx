import { Navbar } from 'react-bootstrap';
import { useAppContext } from 'globals/providers/AppProvider';
import classNames from 'classnames';
import NavbarBrand from 'globals/components/navbars/nav-items/NavbarBrand';
import NavItems from 'globals/components/navbars/nav-items/NavItems';
import NavItemsSlim from 'globals/components/navbars/nav-items/NavItemsSlim';
import DropdownSearchBox from 'globals/components/common/DropdownSearchBox';
import SearchResult from 'globals/components/common/SearchResult';
import { useBreakpoints } from 'globals/providers/BreakpointsProvider';

const NavbarTopDefault = () => {
  const {
    config: { navbarTopShape, navbarTopAppearance }
  } = useAppContext();

  const { breakpoints } = useBreakpoints();

  return (
    <Navbar
      className={classNames('navbar-top fixed-top', {
        'navbar-slim': navbarTopShape === 'slim'
        // 'navbar-darker': navbarTopAppearance === 'darker'
      })}
      expand
      variant=""
      data-navbar-appearance={navbarTopAppearance === 'darker' ? 'darker' : ''}
    >
      <div className="navbar-collapse justify-content-between">
        <NavbarBrand />

        {navbarTopShape === 'default' ? (
          <>
            {breakpoints.up('lg') && (
              <DropdownSearchBox
                className="navbar-top-search-box"
                inputClassName="rounded-pill"
                size="sm"
                style={{ width: '25rem' }}
              >
                <SearchResult />
              </DropdownSearchBox>
            )}
            <NavItems />
          </>
        ) : (
          <NavItemsSlim />
        )}
      </div>
    </Navbar>
  );
};

export default NavbarTopDefault;
