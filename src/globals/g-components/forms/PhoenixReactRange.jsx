import React from 'react';
import { Range, getTrackBackground } from 'react-range'; // import the types directly from react-range
import { useAppContext } from 'providers/AppProvider';
const PhoenixReactRange = ({ step = 1, min = 0, max = 100, variant = 'primary', trackHeight = '0.75rem', tipFormatter, draggableTrack = false, alwaysShowTooltip = false, values, onChange = () => { }, classNames }) => {
    const { getThemeColor, config: { isRTL } } = useAppContext();
    const Track = ({ props, children }) => (<div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} className={`phoenix-react-range ${classNames ? classNames : ''}`} style={Object.assign({}, props.style)}>
      <div ref={props.ref} className="phoenix-react-range-track" style={{
            height: trackHeight,
            cursor: !draggableTrack ? 'pointer' : 'ew-resize',
            background: getTrackBackground({
                values,
                colors: values.length === 2
                    ? [
                        getThemeColor('gray-100'),
                        getThemeColor(variant),
                        getThemeColor('gray-100')
                    ]
                    : [getThemeColor(variant), getThemeColor('gray-100')],
                min,
                max,
                rtl: isRTL
            }),
            alignSelf: 'center'
        }}>
        {children}
      </div>
    </div>);
    const Thumb = ({ props, isDragged, index }) => {
        return (<div {...props} key={props.key} className={`phoenix-react-range-thumb ${isDragged ? 'dragging' : ''}`} style={Object.assign({}, props.style)}>
        <div className={`phoenix-react-range-tooltip ${alwaysShowTooltip || isDragged ? 'show' : ''}`}>
          {tipFormatter
                ? tipFormatter(values[index])
                : values[index].toFixed(1)}
        </div>
      </div>);
    };
    return (<Range draggableTrack={draggableTrack} values={values} step={step} min={min} max={max} onChange={onChange} renderTrack={Track} renderThumb={Thumb} rtl={isRTL}/>);
};
export default PhoenixReactRange;
