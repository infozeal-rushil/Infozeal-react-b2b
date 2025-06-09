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
const IndeterminateCheckbox = (_a) => {
    var { indeterminate, className } = _a, rest = __rest(_a, ["indeterminate", "className"]);
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            if (ref.current) {
                ref.current.indeterminate = !rest.checked && indeterminate;
            }
        }
    }, [ref, indeterminate]);
    return (<Form.Check type="checkbox" className={classNames(className)}>
      <Form.Check.Input type="checkbox" ref={ref} {...rest}/>
    </Form.Check>);
};
export default IndeterminateCheckbox;
