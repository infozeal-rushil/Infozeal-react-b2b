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
import { Badge as BsBadge } from 'react-bootstrap';
const Badge = (_a) => {
    var { children, bg, icon, className, variant = 'default', iconPosition = 'start', iconFamily = 'feather' } = _a, rest = __rest(_a, ["children", "bg", "icon", "className", "variant", "iconPosition", "iconFamily"]);
    return (<BsBadge className={classNames(className, {
            [`badge-phoenix badge-phoenix-${bg}`]: variant === 'phoenix',
            'badge-tag': variant === 'tag'
        })} bg={['phoenix', 'tag'].includes(variant) ? '' : bg} {...rest}>
      {variant === 'phoenix' ? (<>
          {icon ? (<>
              {icon && iconPosition === 'start' && icon}
              <span className={classNames({
                    'badge-label': iconFamily === 'feather'
                })}>
                {children}
              </span>
              {icon && iconPosition === 'end' && icon}
            </>) : (children)}
        </>) : (children)}
    </BsBadge>);
};
export default Badge;
