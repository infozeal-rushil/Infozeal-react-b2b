import React from 'react';
import useLightbox from 'hooks/useLightbox';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Lightbox from 'components/base/LightBox';
const LightBoxItem = ({ item, handleImageClick, isLast }) => {
    return (<div onClick={handleImageClick} className={classNames('cursor-pointer', {
            'position-relative rounded-2 overflow-hidden': isLast
        })}>
      <img src={item.image} alt="" className="img-fluid rounded-2"/>
      {isLast && (<div className="position-absolute w-100 h-100 left-0 top-0 d-flex flex-center bg-black bg-opacity-50">
          <Link to="/apps/travel-agency/hotel/customer/gallery" className="text-white stretched-link fs-7 fs-lg-5 fw-bolder">
            24+
          </Link>
        </div>)}
    </div>);
};
const TripDetailsAlbum = ({ imageItems }) => {
    const { lightboxProps, openLightbox } = useLightbox(imageItems.map(image => image.largeImage));
    return (<Row className="g-2 g-md-3">
      {imageItems.map((image, index) => (<Col key={image.id} xs={4}>
          <LightBoxItem item={image} handleImageClick={() => openLightbox(index + 1)} isLast={imageItems.length - 1 === index}/>
        </Col>))}
      <Lightbox {...lightboxProps}/>
    </Row>);
};
export default TripDetailsAlbum;
