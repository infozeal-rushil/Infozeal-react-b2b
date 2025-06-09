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
import { Navigation } from 'swiper/modules';
import { Swiper as ReactSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const Swiper = (_a) => {
    var { children, navigation = true, navigationPosition } = _a, rest = __rest(_a, ["children", "navigation", "navigationPosition"]);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (<div className="swiper-theme-container">
      {navigation && (<>
          <button className="swiper-button-next" style={navigationPosition} ref={navigationNextRef}>
            <FontAwesomeIcon icon={faChevronRight}/>
          </button>
          <button className="swiper-button-prev" style={navigationPosition} ref={navigationPrevRef}>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
        </>)}
      <ReactSwiper modules={[Navigation]} navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
            disabledClass: 'swiper-button-disabled'
        }} onBeforeInit={swiper => {
            if (swiper.params.navigation) {
                const navigation = swiper.params.navigation;
                navigation.prevEl = navigationPrevRef.current;
                navigation.nextEl = navigationNextRef.current;
            }
        }} {...rest}>
        {children}
      </ReactSwiper>
    </div>);
};
export default Swiper;
