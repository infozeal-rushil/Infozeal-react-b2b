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
import classNames from 'classnames';
import Scrollbars from 'react-custom-scrollbars-2';
const Scrollbar = (_a) => {
    var { children, autoHide = true, className } = _a, rest = __rest(_a, ["children", "autoHide", "className"]);
    return (<Scrollbars autoHide={autoHide} renderTrackVertical={props => (<div {...props} className="track-vertical h-100 rounded"/>)} className={classNames('custom-scrollbar', className)} {...rest}>
      {children}
    </Scrollbars>);
};
export default Scrollbar;
