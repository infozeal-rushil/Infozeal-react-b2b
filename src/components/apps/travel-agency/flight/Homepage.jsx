import NavbarHome from '@globals/g-components/navbars/travel-agency/NavbarHome';
import { Container } from 'react-bootstrap';
import bgIllustrations from '@src/assets/img/bg/44.png';
import FlightSearch from '@globals/g-components/modules/travel-agency/flight/homepage/FlightSearch';
import FlightListing from '@globals/g-components/modules/travel-agency/flight/homepage/FlightListing';
import FlightFooter from '@globals/g-components/modules/travel-agency/flight/homepage/FlightFooter';
import FlightPromoModal from '@globals/g-components/modals/FlightPromoModal';
import { useState } from 'react';
import ResizableNavbar from '@globals/g-components/navbars/travel-agency/ResizableNavbar';
import { flightNavItems } from '@globals/g-data/travel-agency/resizableNav';
const FlightHomepage = () => {
  const [showPromoModal, setShowPromoModal] = useState(true);
  return (
    <>
      <ResizableNavbar navItems={flightNavItems} />
      <section className="container-small py-0">
        <NavbarHome currentPage="Flight" />
      </section>
      <section className="p-0">
        <Container fluid className="px-0">
          <div className="position-relative" style={{ height: '19rem' }}>
            <div
              className="bg-holder"
              style={{
                backgroundImage: `url(${bgIllustrations})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </Container>
        <Container
          fluid="small"
          className="mb-6"
          style={{ marginTop: '-12rem' }}
        >
          <FlightSearch />
          <FlightListing />
        </Container>
        <FlightFooter />
      </section>
      <FlightPromoModal
        show={showPromoModal}
        handleClose={() => setShowPromoModal(false)}
      />
    </>
  );
};
export default FlightHomepage;
