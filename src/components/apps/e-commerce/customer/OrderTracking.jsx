import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@globals/g-components/base/Button';
import Section from '@globals/g-components/base/Section';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import PhoenixLoader from '@globals/g-components/common/PhoenixLoader';
import OrderTrackingTimeline from '@globals/g-components/timelines/OrderTrackingTimeline';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import { orderTrackingTimelineData } from '@globals/g-data/timelineData';
import { lazy, Suspense } from 'react';
import { Col, Row } from 'react-bootstrap';
const Mapbox = lazy(() => import('@globals/g-components/base/MapBox'));
const OrderTracking = () => {
    return (<div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={defaultBreadcrumbItems}/>
        <div className="d-flex gap-3 flex-wrap justify-content-between align-items-end mb-5">
          <div>
            <h2>Order #234 Status</h2>
            <p className="text-body-secondary mb-0">
              Payment Via{' '}
              <a className="fw-bold" href="#!">
                Cash on delivery
              </a>
              ,<br className="d-sm-none"/>
              <span className="ms-sm-1">Nov 12, 2021, 8:54AM.</span>
            </p>
          </div>
          <Button variant="outline-primary">
            <FontAwesomeIcon icon={faPhone} className="me-2"/>
            Call Support
          </Button>
        </div>
        <Row className="gy-9 gx-5">
          <Col xs={12} lg={6}>
            <Suspense fallback={<PhoenixLoader />}>
              <Mapbox className="border rounded-3 min-vh-50" options={{
            center: [-74.0020158, 40.7228022],
            zoom: 15,
            scrollZoom: false
        }}/>
            </Suspense>
          </Col>
          <Col xs={12} lg={6}>
            <OrderTrackingTimeline data={orderTrackingTimelineData}/>
          </Col>
        </Row>
      </Section>
    </div>);
};
export default OrderTracking;
