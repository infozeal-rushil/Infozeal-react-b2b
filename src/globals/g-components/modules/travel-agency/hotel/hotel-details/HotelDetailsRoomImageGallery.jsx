import React from 'react';
import { Row, Col } from 'react-bootstrap';
import useLightbox from 'hooks/useLightbox';
import Lightbox from 'components/base/LightBox';
const RoomImageItem = ({ item, handleClick }) => {
    return (<div className="cursor-pointer h-100" onClick={handleClick}>
      <img src={item} alt="" className="w-100 h-100 object-fit-cover rounded-2"/>
    </div>);
};
const HotelDetailsRoomImageGallery = ({ images }) => {
    const { lightboxProps, openLightbox } = useLightbox(images);
    return (<>
      <Row className="gx-2 h-100">
        {images.map((imageItem, index) => (<Col key={index}>
            <RoomImageItem item={imageItem} handleClick={() => openLightbox(index + 1)}/>
          </Col>))}
      </Row>
      <div>
        <Lightbox {...lightboxProps}/>
      </div>
    </>);
};
export default HotelDetailsRoomImageGallery;
