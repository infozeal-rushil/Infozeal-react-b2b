import React from 'react';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import HotelGalleryImages from '@globals/g-components/modules/travel-agency/hotel/HotelGalleryImages';
import { galleryItems } from '@globals/g-data/travel-agency/customer/gallery';
import { Container } from 'react-bootstrap';
import TravelFooter from '@globals/g-components/footers/TravelFooter';
import ResizableNavbar from '@globals/g-components/navbars/travel-agency/ResizableNavbar';
import { hotelNavItems } from '@globals/g-data/travel-agency/resizableNav';
const HotelGallery = () => {
    return (<>
      <ResizableNavbar navItems={hotelNavItems}/>
      <section className="pt-6 pb-9">
        <Container fluid="medium">
          <PageBreadcrumb items={defaultBreadcrumbItems} className="mb-3"/>
          <h2 className="mb-5">Gallery</h2>
          <HotelGalleryImages galleryItems={galleryItems}/>
        </Container>
      </section>
      <TravelFooter />
    </>);
};
export default HotelGallery;
