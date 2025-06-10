import React from 'react';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import NavbarHome from '@globals/g-components/navbars/travel-agency/NavbarHome';
import ResizableNavbar from '@globals/g-components/navbars/travel-agency/ResizableNavbar';
import { tripNavItems } from '@globals/g-data/travel-agency/resizableNav';
import TripHomepageHeroBanner from '@globals/g-components/modules/travel-agency/trip/homepage/TripHomepageHeroBanner';
import TripHomepageTripList from '@globals/g-components/modules/travel-agency/trip/homepage/TripHomepageTripList';
import { tripHomepageItems } from '@globals/g-data/travel-agency/customer/trip';
const TripHomepage = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true
    });
    return (<>
      <ResizableNavbar navItems={tripNavItems}/>
      <section className="container-small py-0">
        <NavbarHome currentPage="Trip"/>
      </section>
      <TripHomepageHeroBanner />
      <TripHomepageTripList tripItems={tripHomepageItems}/>
    </>);
};
export default TripHomepage;
