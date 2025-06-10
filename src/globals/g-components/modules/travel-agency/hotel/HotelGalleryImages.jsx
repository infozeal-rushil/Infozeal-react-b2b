import React, { useState } from 'react';
import useLightbox from 'hooks/useLightbox';
import Lightbox from 'components/base/LightBox';
import GalleryItem from './HotelGalleryItem';
const HotelGalleryImages = ({ galleryItems }) => {
    const [items] = useState(galleryItems);
    const { lightboxProps, openLightbox } = useLightbox(items
        .map((el) => el.video || el.largeImg)
        .filter((item) => !!item));
    return (<>
      <div className="gap-2 gap-sm-3 d-grid grid-cols-12">
        {galleryItems.map((gallery, index) => (<GalleryItem galleryItem={gallery} key={gallery.id} onClick={() => openLightbox(index + 1)}/>))}
      </div>
      <div>
        <Lightbox {...lightboxProps}/>
      </div>
    </>);
};
export default HotelGalleryImages;
