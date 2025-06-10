import { Navbar } from 'react-bootstrap';
import { useAppContext } from '@globals/g-providers/AppProvider';
import classNames from 'classnames';
import NavbarBrand from '@globals/g-components/navbars/nav-items/NavbarBrand';
import NavItems from '@globals/g-components/navbars/nav-items/NavItems';
import NavItemsSlim from '@globals/g-components/navbars/nav-items/NavItemsSlim';
import DropdownSearchBox from '@globals/g-components/common/DropdownSearchBox';
import SearchResult from '@globals/g-components/common/SearchResult';
import { useBreakpoints } from '@globals/g-providers/BreakpointsProvider';
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
