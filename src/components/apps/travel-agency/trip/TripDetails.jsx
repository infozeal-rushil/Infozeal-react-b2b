import React from 'react';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import ResizableNavbar from '@globals/g-components/navbars/travel-agency/ResizableNavbar';
import { tripNavItems } from '@globals/g-data/travel-agency/resizableNav';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import { Container, Row } from 'react-bootstrap';
import TripDetailsOverview from '@globals/g-components/modules/travel-agency/trip/trip-details/TripDetailsOverview';
import TripDetailsGallery from '@globals/g-components/modules/travel-agency/trip/trip-details/TripDetailsGallery';
import { tripDetailsAlbum, tripHomepageItems, tripOverview } from '@globals/g-data/travel-agency/customer/trip';
import TripDetailsTab from '@globals/g-components/modules/travel-agency/trip/trip-details/TripDetailsTab';
import TripShowcaseItem from '@globals/g-components/modules/travel-agency/trip/TripShowcaseItem';
import { Link } from 'react-router-dom';
const TripDetails = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true
    });
    return (<>
      <ResizableNavbar navItems={tripNavItems}/>
      <section className="pt-5 pb-5 pb-md-6 pb-lg-9">
        <Container fluid="medium">
          <PageBreadcrumb items={defaultBreadcrumbItems} className="mb-3"/>
          <h2 className="mb-5">Trip Details</h2>
          <h1 className="fw-bold">
            Walk where the king walked once in Wakanda{' '}
            <span className="align-middle text-nowrap fs-8">
              <span className="text-body-quaternary">by </span>
              <Link to="#!" className="text-body-tertiary">
                Panther Travels Limited
              </Link>
            </span>
          </h1>
          <hr className="bg-secondary-lighter"/>
          <TripDetailsOverview tripOverview={tripOverview}/>
          <TripDetailsGallery galleryItems={tripDetailsAlbum}/>
          <TripDetailsTab />
          <h2 className="mt-5 mb-3">Similar tours</h2>
          <Row className="g-3">
            {tripHomepageItems
            .slice(tripHomepageItems.length - 3)
            .map(tripItem => (<TripShowcaseItem showcaseItem={tripItem} key={tripItem.id}/>))}
          </Row>
        </Container>
      </section>
    </>);
};
export default TripDetails;
