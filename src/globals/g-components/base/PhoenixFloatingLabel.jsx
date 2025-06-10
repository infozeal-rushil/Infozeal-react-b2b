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
import { Form } from 'react-bootstrap';
const PhoenixFloatingLabel = (_a) => {
    var { children, startComponent, endComponent, className, label } = _a, rest = __rest(_a, ["children", "startComponent", "endComponent", "className", "label"]);
    return (<Form.Floating className={classNames(className, 'phoenix-form-floating')} {...rest}>
      {startComponent &&
            React.cloneElement(startComponent, {
                className: classNames(startComponent.props.className, 'form-floating-icon form-floating-start-icon')
            })}

      {React.Children.map(children, child => React.cloneElement(child, {
            className: classNames(child.props.className),
            style: {
                paddingLeft: startComponent && '2.25rem'
            }
        }))}

      {endComponent &&
            React.cloneElement(endComponent, {
                className: classNames(endComponent.props.className, 'form-floating-icon form-floating-end-icon')
            })}
      <label className={classNames({
            'ps-6': startComponent
        })}>
        {label}
      </label>
    </Form.Floating>);
};
export default PhoenixFloatingLabel;
