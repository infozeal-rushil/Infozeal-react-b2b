import React from 'react';
import useLightbox from 'hooks/useLightbox';
import Lightbox from 'components/base/LightBox';
const TripDetailsReviewTabCommentUpload = ({ uploadedCommentImage }) => {
    const { lightboxProps, openLightbox } = useLightbox(uploadedCommentImage.map(src => src.largeImg));
    return (<>
      {uploadedCommentImage.map((upload, index) => (<div key={upload.id} onClick={() => openLightbox(index + 1)} className="cursor-pointer">
          <img src={upload.image} alt=""/>
        </div>))}
      <Lightbox {...lightboxProps}/>
    </>);
};
export default TripDetailsReviewTabCommentUpload;
