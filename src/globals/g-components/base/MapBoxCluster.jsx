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
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useAppContext } from 'providers/AppProvider';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
const MapboxCluster = (_a) => {
    var { className, options, mapData } = _a, rest = __rest(_a, ["className", "options", "mapData"]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const { config: { theme, isDark } } = useAppContext();
    const styles = {
        default: 'mapbox://styles/mapbox/light-v11',
        auto: isDark
            ? 'mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew'
            : 'mapbox://styles/themewagon/clj57pads001701qo25756jtw',
        light: 'mapbox://styles/themewagon/clj57pads001701qo25756jtw',
        dark: 'mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew'
    };
    useEffect(() => {
        var _a;
        if (map.current)
            return;
        map.current = new mapboxgl.Map(Object.assign({ container: mapContainer.current, style: styles[theme], scrollZoom: false }, options));
        (_a = map.current) === null || _a === void 0 ? void 0 : _a.on('load', () => {
            var _a, _b, _c, _d, _e;
            (_a = map.current) === null || _a === void 0 ? void 0 : _a.addSource('earthquakes', {
                type: 'geojson',
                data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });
            mapData === null || mapData === void 0 ? void 0 : mapData.forEach(itm => {
                var _a;
                if (!itm.id && !itm.type && !itm.source) {
                    console.warn('Invalid mapData item:', itm);
                    return;
                }
                const layerConfig = {
                    id: itm.id,
                    type: itm.type,
                    source: itm.source,
                    layout: itm.layout || {},
                    paint: itm.paint || {},
                    filter: itm.filter || []
                };
                try {
                    (_a = map.current) === null || _a === void 0 ? void 0 : _a.addLayer(layerConfig);
                }
                catch (error) {
                    console.error(`Failed to add layer ${itm.id}:`, error);
                }
            });
            (_b = map.current) === null || _b === void 0 ? void 0 : _b.on('click', 'clusters', e => {
                var _a, _b, _c, _d;
                const features = (_a = map.current) === null || _a === void 0 ? void 0 : _a.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                if (!features || features.length === 0)
                    return;
                const clusterId = (_b = features[0].properties) === null || _b === void 0 ? void 0 : _b.cluster_id;
                if (!clusterId)
                    return;
                (_d = (_c = map.current) === null || _c === void 0 ? void 0 : _c.getSource('earthquakes')) === null || _d === void 0 ? void 0 : _d.getClusterExpansionZoom(clusterId, (err, zoom) => {
                    var _a;
                    if (err)
                        return;
                    if (features[0].geometry.type === 'Point') {
                        const coordinates = features[0].geometry.coordinates;
                        (_a = map.current) === null || _a === void 0 ? void 0 : _a.easeTo({
                            center: coordinates,
                            zoom
                        });
                    }
                });
            });
            (_c = map.current) === null || _c === void 0 ? void 0 : _c.on('click', 'unclustered-point', e => {
                if (!e.features || e.features.length === 0)
                    return;
                const feature = e.features[0];
                if (feature.geometry.type !== 'Point')
                    return;
                const coordinates = feature.geometry.coordinates.slice();
                const { mag, tsunami } = feature.properties;
                if (map.current) {
                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`Magnitude: ${mag !== null && mag !== void 0 ? mag : 'N/A'}<br>Tsunami: ${tsunami === 1 ? 'yes' : 'no'}`)
                        .addTo(map.current);
                }
            });
            (_d = map.current) === null || _d === void 0 ? void 0 : _d.on('mouseenter', 'clusters', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            (_e = map.current) === null || _e === void 0 ? void 0 : _e.on('mouseleave', 'clusters', () => {
                map.current.getCanvas().style.cursor = '';
            });
        });
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [theme, isDark, options, mapData]);
    useEffect(() => {
        var _a;
        (_a = map.current) === null || _a === void 0 ? void 0 : _a.setStyle(styles[theme]);
    }, [theme]);
    return (<div className={classNames(className, 'mapbox-container')} {...rest}>
      <div ref={mapContainer} className="map-container"/>
      <div className="mapbox-control-btn">
        <Button onClick={() => { var _a; return (_a = map.current) === null || _a === void 0 ? void 0 : _a.zoomIn(); }} className="zoomIn">
          <FontAwesomeIcon icon={faPlus}/>
        </Button>
        <Button onClick={() => { var _a; return (_a = map.current) === null || _a === void 0 ? void 0 : _a.zoomOut(); }} className="zoomOut">
          <FontAwesomeIcon icon={faMinus}/>
        </Button>
      </div>
    </div>);
};
export default MapboxCluster;
