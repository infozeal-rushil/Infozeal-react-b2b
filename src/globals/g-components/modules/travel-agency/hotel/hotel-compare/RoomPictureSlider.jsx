var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useRef } from 'react';
import classNames from 'classnames';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const RoomPictureSlider = (_a) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    return (<div className={classNames('swiper-theme-container', className)}>
      <div className="swiper-nav swiper-nav-inside">
        <button className="swiper-button-next" ref={navigationNextRef}>
          <FontAwesomeIcon icon={faChevronRight}/>
        </button>
        <button className="swiper-button-prev" ref={navigationPrevRef}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
      </div>
      <Swiper loop={true} grabCursor={true} navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current
        }} modules={[Navigation]} onBeforeInit={swiper => {
            if (swiper.params.navigation) {
                const navigation = swiper.params.navigation;
                navigation.prevEl = navigationPrevRef.current;
                navigation.nextEl = navigationNextRef.current;
            }
        }} {...props} className="theme-slider">
        {children}
      </Swiper>
    </div>);
};
export default RoomPictureSlider;
