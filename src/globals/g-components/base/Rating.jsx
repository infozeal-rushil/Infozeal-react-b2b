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
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Rating as ReactRating } from 'react-simple-star-rating';
const Rating = (_a) => {
    var { iconClass, fillIconColor = 'warning', emptyIconColor = 'warning-light' } = _a, rest = __rest(_a, ["iconClass", "fillIconColor", "emptyIconColor"]);
    return (<ReactRating allowFraction fillIcon={<FontAwesomeIcon icon={faStar} className={classNames(iconClass, `text-${fillIconColor}`)}/>} emptyIcon={<FontAwesomeIcon icon={farStar} className={classNames(iconClass, `text-${emptyIconColor}`)}/>} {...rest}/>);
};
export default Rating;
