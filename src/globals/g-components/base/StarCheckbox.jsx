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
import { useState } from 'react';
import Rating from './Rating';
const StarCheckbox = (_a) => {
    var { defaultChecked, onClick } = _a, rest = __rest(_a, ["defaultChecked", "onClick"]);
    const [rating, setRating] = useState(defaultChecked ? 1 : 0);
    const handleRating = () => {
        if (rating === 0) {
            setRating(1);
        }
        else {
            setRating(0);
        }
        if (onClick) {
            onClick();
        }
    };
    return (<Rating key={rating} iconClass="fs-8" {...rest} initialValue={rating} iconsCount={1} allowFraction={false} onClick={handleRating}/>);
};
export default StarCheckbox;
