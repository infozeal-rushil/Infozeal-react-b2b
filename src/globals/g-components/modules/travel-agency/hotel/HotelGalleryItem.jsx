import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
const HotelGalleryItem = ({ galleryItem, onClick }) => {
    const ref = useRef(null);
    const handleMouseEnter = () => {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.play();
    };
    const handleMouseOut = () => {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.pause();
    };
    return (<div className={classNames(galleryItem.classNames, 'cursor-pointer')} onClick={onClick}>
      {galleryItem.video ? (<div className="video-container position-relative h-100">
          <video className="w-100 h-100 object-fit-cover overflow-hidden rounded-2" src={galleryItem.video} muted onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut} ref={ref}/>
          <div className="video-icon position-absolute top-50 start-50 translate-middle bg-body-emphasis rounded-pill bg-opacity-50">
            <FontAwesomeIcon icon={faVideo}/>
          </div>
        </div>) : (<img src={galleryItem.img} alt="" className="rounded-2 h-100 w-100 object-fit-cover"/>)}
    </div>);
};
export default HotelGalleryItem;
