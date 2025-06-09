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
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAppContext } from 'providers/AppProvider';
// @ts-ignore
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker?worker';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
// @ts-ignore
mapboxgl.workerClass = MapboxWorker;
const HotelDetailsMapBox = (_a) => {
    var { currentTab, className, options } = _a, rest = __rest(_a, ["currentTab", "className", "options"]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const { config: { isDark } } = useAppContext();
    const styles = {
        default: 'mapbox://styles/mapbox/light-v11',
        auto: isDark
            ? 'mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew'
            : 'mapbox://styles/themewagon/clj57pads001701qo25756jtw',
        light: 'mapbox://styles/themewagon/clj57pads001701qo25756jtw',
        dark: 'mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew'
    };
    const { config: { theme } } = useAppContext();
    useEffect(() => {
        if (map.current)
            return;
        if (mapContainer.current) {
            map.current = new mapboxgl.Map(Object.assign({ container: mapContainer.current, style: styles[theme], scrollZoom: false }, options));
            if (options.center) {
                new mapboxgl.Marker({
                    color: '#ed2000'
                })
                    .setLngLat(options.center)
                    .addTo(map.current);
            }
        }
    }, []);
    useEffect(() => {
        var _a;
        (_a = map.current) === null || _a === void 0 ? void 0 : _a.setStyle(styles[theme]);
    }, [theme]);
    useEffect(() => {
        var _a;
        if (currentTab === 'description') {
            (_a = map.current) === null || _a === void 0 ? void 0 : _a.resize();
        }
    }, [currentTab]);
    return (<>
      <div className={classNames(className, 'mapbox-container')} {...rest}>
        <div ref={mapContainer} className="map-container"/>
        <div className="mapbox-control-btn">
          <Button onClick={() => { var _a; return (_a = map.current) === null || _a === void 0 ? void 0 : _a.zoomIn(); }} className="zoomIn">
            <FontAwesomeIcon icon={faPlus}/>
          </Button>
          <Button onClick={() => { var _a; return (_a = map.current) === null || _a === void 0 ? void 0 : _a.zoomOut(); }} className="zoomOut">
            <FontAwesomeIcon icon={faMinus}/>
          </Button>
        </div>
      </div>
    </>);
};
export default HotelDetailsMapBox;
