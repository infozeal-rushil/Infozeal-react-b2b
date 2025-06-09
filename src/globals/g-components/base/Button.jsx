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
import React from 'react';
import { Button as BsButton, Spinner } from 'react-bootstrap';
const Button = (_a) => {
    var { children, startIcon, endIcon, loading, loadingPosition, className, variant = '' } = _a, rest = __rest(_a, ["children", "startIcon", "endIcon", "loading", "loadingPosition", "className", "variant"]);
    return (<BsButton variant={variant} type="button" disabled={loading} {...rest} className={classNames(className, {
            'btn-loading lh-1 d-flex align-items-center position-relative': loading
        })}>
      {loading && loadingPosition === 'start' && (<Spinner animation="border" role="status" className="me-2">
          <span className="visually-hidden">Loading...</span>
        </Spinner>)}
      {startIcon &&
            React.cloneElement(startIcon, {
                className: classNames(startIcon.props.className, 'me-1')
            })}

      {children}

      {endIcon &&
            React.cloneElement(endIcon, {
                className: classNames(endIcon.props.className, 'ms-1')
            })}
      {loading && loadingPosition === 'end' && (<Spinner animation="border" role="status" className="ms-2">
          <span className="visually-hidden">Loading...</span>
        </Spinner>)}
    </BsButton>);
};
export default Button;
