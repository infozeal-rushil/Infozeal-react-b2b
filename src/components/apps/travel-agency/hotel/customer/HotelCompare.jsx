import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import EcomTopRegionsMap from '@globals/g-components/leaflet-maps/EcomTopRegionsMap';
import { mapMarkerPoints } from '@globals/g-data/mapMarkerPoints';
import CollapsibleContainer from '@globals/g-components/common/CollapsibleContainer';
import CompareHotelDetails from '@globals/g-components/modules/travel-agency/hotel/hotel-compare/CompareHotelDetails';
import { hotelInfo, popularAmenitiesFields, reviewFields } from '@globals/g-data/travel-agency/customer/hotelCompare';
import CompareRoomDetails from '@globals/g-components/modules/travel-agency/hotel/hotel-compare/CompareRoomDetails';
import HotelActions from '@globals/g-components/modules/travel-agency/hotel/HotelActions';
import { Container } from 'react-bootstrap';
import TravelFooter from '@globals/g-components/footers/TravelFooter';
import ResizableNavbar from '@globals/g-components/navbars/travel-agency/ResizableNavbar';
import { hotelNavItems } from '@globals/g-data/travel-agency/resizableNav';
const HotelCompare = () => {
    return (<>
      <ResizableNavbar navItems={hotelNavItems}/>
      <section className="pt-6 pb-9">
        <Container fluid="medium">
          <PageBreadcrumb items={defaultBreadcrumbItems} className="mb-3"/>
          <h2 className="mb-4">Hotel Compare</h2>
          <HotelActions background={false}/>
          <div className="w-100 border rounded-3 overflow-hidden my-5" style={{
            height: 220
        }}>
            <EcomTopRegionsMap data={mapMarkerPoints}/>
          </div>
          <div className="position-relative scrollbar">
            <CollapsibleContainer collapseTitle="Hotel Details" id="hotelDetailsCollapse">
              <CompareHotelDetails hotelInfo={hotelInfo} reviewFields={reviewFields}/>
            </CollapsibleContainer>
            <CollapsibleContainer collapseTitle="Room Details" id="roomDetailsCollapse" className="mt-8">
              <CompareRoomDetails hotelInfo={hotelInfo} reviewFields={popularAmenitiesFields}/>
            </CollapsibleContainer>
          </div>
        </Container>
      </section>
      <TravelFooter />
    </>);
};
export default HotelCompare;
