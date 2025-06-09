import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const TripDetailsMostHighlights = ({ items }) => {
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    return (<div className="position-relative swiper-theme-container hotel-compare-slider overflow-hidden rounded-2">
      <Swiper dir="horizontal" slidesPerView={1} loop autoplay={{
            delay: 5000,
            disableOnInteraction: false
        }} pagination={{
            clickable: true
        }} modules={[Autoplay, Pagination, Navigation]} navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current
        }} onBeforeInit={swiper => {
            if (swiper.params.navigation) {
                const navigation = swiper.params.navigation;
                navigation.prevEl = navigationPrevRef.current;
                navigation.nextEl = navigationNextRef.current;
            }
        }}>
        {items.map((item, index) => (<SwiperSlide key={index}>
            <img src={item.image} alt="" className="img-fluid object-fit-cover"/>
          </SwiperSlide>))}
      </Swiper>
      <div className="swiper-nav swiper-nav-inside">
        <button className="swiper-button-next" ref={navigationNextRef}>
          <FontAwesomeIcon icon={faChevronRight}/>
        </button>
        <button className="swiper-button-prev" ref={navigationPrevRef}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
      </div>
    </div>);
};
export default TripDetailsMostHighlights;
