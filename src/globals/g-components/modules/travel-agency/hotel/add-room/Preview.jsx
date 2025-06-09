import { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { faBanSmoking, faBath, faBed, faBorderAll, faChildren, faFilePen, faPeopleRoof, faPersonBooth, faPersonShelter, faPersonSwimming, faSnowflake, faSquareParking, faTableTennisPaddleBall, faTv, faUmbrellaBeach, faUser, faUtensils, faWifi, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SummaryTable from './SummaryTable';
import { useWizardFormContext } from 'providers/WizardFormProvider';
const Preview = () => {
    var _a;
    const methods = useWizardFormContext();
    const { formData } = methods;
    const [show, setShow] = useState(true);
    const roomInformation = [
        {
            property: 'Room type',
            value: (formData === null || formData === void 0 ? void 0 : formData.roomType) || '',
            icon: faBorderAll
        },
        {
            property: 'Room name',
            value: (formData === null || formData === void 0 ? void 0 : formData.roomName) || '',
            icon: faFilePen
        },
        {
            property: 'Bedroom’s',
            value: (formData === null || formData === void 0 ? void 0 : formData.bedRooms) || 1,
            icon: faFilePen
        },
        {
            property: 'Number of beds',
            value: (formData === null || formData === void 0 ? void 0 : formData.noOfBed) || 1,
            icon: faBed
        },
        {
            property: 'Room size',
            value: (formData === null || formData === void 0 ? void 0 : formData.roomSize) || '',
            icon: faPersonShelter
        },
        {
            property: 'Adults',
            value: (formData === null || formData === void 0 ? void 0 : formData.adults) || 1,
            icon: faUser
        },
        {
            property: 'Childs',
            value: (formData === null || formData === void 0 ? void 0 : formData.childs) || 0,
            icon: faChildren
        },
        {
            property: 'Bathroom’s',
            value: (formData === null || formData === void 0 ? void 0 : formData.BathRooms) || 1,
            icon: faBath
        },
        {
            property: 'Balcony',
            value: (formData === null || formData === void 0 ? void 0 : formData.Balcony) || 1,
            icon: faPersonBooth
        }
    ];
    const amenities = [
        {
            property: 'Wifi',
            value: (formData === null || formData === void 0 ? void 0 : formData.wifi) ? 'Free' : 'Paid',
            icon: faWifi
        },
        {
            property: 'Restaurant',
            value: (formData === null || formData === void 0 ? void 0 : formData.restrurent) ? 'Launch & Dinner' : 'Not available',
            icon: faUtensils
        },
        {
            property: 'Pool',
            value: (formData === null || formData === void 0 ? void 0 : formData.pool) ? 'paid' : 'Free',
            icon: faPersonSwimming
        },
        {
            property: 'No smoking',
            value: (formData === null || formData === void 0 ? void 0 : formData.noSmoking) ? 'Available' : 'Not available',
            icon: faBanSmoking
        },
        {
            property: 'Parking',
            value: (formData === null || formData === void 0 ? void 0 : formData.parking) ? 'Free' : 'Paid',
            icon: faSquareParking
        },
        {
            property: 'Beach view',
            value: (formData === null || formData === void 0 ? void 0 : formData.beachView) ? 'Available' : 'Not available',
            icon: faUmbrellaBeach
        },
        {
            property: 'Balcony',
            value: (formData === null || formData === void 0 ? void 0 : formData.balcony) ? 'Available' : 'Not available',
            icon: faPersonBooth
        },
        {
            property: 'Hotel bar',
            value: (formData === null || formData === void 0 ? void 0 : formData.hotelBar) ? 'Free' : 'Paid',
            icon: faWineGlass
        },
        {
            property: 'Common areas',
            value: (formData === null || formData === void 0 ? void 0 : formData.commonAreas) ? 'Available' : 'Not available',
            icon: faPeopleRoof
        },
        {
            property: 'Tennis courts',
            value: (formData === null || formData === void 0 ? void 0 : formData.tennisCourts) ? 'Free' : 'Paid',
            icon: faTableTennisPaddleBall
        },
        {
            property: 'Air conditioning',
            value: (formData === null || formData === void 0 ? void 0 : formData.airconditioning) ? 'Available' : 'Not available',
            icon: faSnowflake
        },
        {
            property: 'Bathtub',
            value: (formData === null || formData === void 0 ? void 0 : formData.bathtub) ? 'Available' : 'Not available',
            icon: faBath
        },
        {
            property: 'Flat-screen TV',
            value: (formData === null || formData === void 0 ? void 0 : formData.flatScreenTv) ? 'Free' : 'Paid',
            icon: faTv
        }
    ];
    return (<>
      <h3 className="mb-2">We’re building your listing</h3>
      <p className="mb-5 text-body-tertiary">
        We're working on getting your property set up and ready for guests. Stay
        tuned for updates and start accepting bookings soon!
      </p>
      {show && (<Alert variant="subtle-success" onClose={() => setShow(false)} dismissible className="mb-5">
          <p className="mb-0 flex-1 fw-semibold fs-9 fs-sm-8">
            Congratulations on your successful listing! Join a community of
            hospitality professionals as a host. Your hard work will turn your
            home into a sought-after destination. We anticipate hearing about
            your achievements.
          </p>
        </Alert>)}
      <h4 className="text-body mb-3">
        Room information
        <Link to="#!" className="fs-9 mx-2">
          Edit
        </Link>
      </h4>
      <Row className="gx-7 gx-xl-4 gx-xxl-7">
        <Col md={7} xxl={6}>
          <SummaryTable items={roomInformation.slice(0, 5)}/>
        </Col>
        <Col md={5} xxl={6}>
          <SummaryTable items={roomInformation.slice(5)}/>
        </Col>
      </Row>
      <h4 className="text-body mb-4 mt-5">
        Pricing
        <Link to="#!" className="fs-9 mx-2">
          Edit
        </Link>
      </h4>
      <h6 className="mb-2">Across all days</h6>
      <h3 className="mb-0">$894</h3>
      <h4 className="text-body mb-3 mt-7">
        Amenities
        <Link to="#!" className="fs-9 mx-2">
          Edit
        </Link>
      </h4>
      <Row className="gx-7 gx-xl-4 gx-xxl-7">
        <Col md={7} xxl={6}>
          <SummaryTable items={amenities.slice(0, 7)}/>
        </Col>
        <Col md={5} xxl={6}>
          <SummaryTable items={amenities.slice(7)}/>
        </Col>
      </Row>
      <h4 className="text-body mb-4 mt-7">
        Picture
        <Link to="#!" className="fs-9 mx-2">
          Edit
        </Link>
      </h4>
      <Row className="g-3">
        {(_a = formData === null || formData === void 0 ? void 0 : formData.pictures) === null || _a === void 0 ? void 0 : _a.map((item, index) => (<Col key={index} sm={4}>
            <img src={URL.createObjectURL(item)} alt="item" height={160} className="rounded-2 w-100 object-fit-cover"/>
          </Col>))}
      </Row>
    </>);
};
export default Preview;
