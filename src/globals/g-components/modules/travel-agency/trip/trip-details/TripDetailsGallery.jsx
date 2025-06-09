import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TripDetailsMostHighlights from 'components/sliders/TripDetailsMostHighlights';
import TripDetailsAlbum from './TripDetailsAlbum';
const TripDetailsGallery = ({ galleryItems }) => {
    return (<Row className="g-2 g-md-3">
      <Col md={6}>
        <TripDetailsMostHighlights items={galleryItems.mostHighlightedImage}/>
      </Col>
      <Col md={6}>
        <TripDetailsAlbum imageItems={galleryItems.highlightImages}/>
      </Col>
    </Row>);
};
export default TripDetailsGallery;
