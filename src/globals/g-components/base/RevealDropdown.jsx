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
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
export const RevealDropdownTrigger = (_a) => {
    var { children, className } = _a, rest = __rest(_a, ["children", "className"]);
    return (<div className={classNames('btn-reveal-trigger', className)} {...rest}>
      {children}
    </div>);
};
const RevealDropdown = ({ children, className, btnClassName, dropdownMenuClassName, icon = faEllipsis }) => {
    return (<Dropdown className={classNames(className)} align="end">
      <Dropdown.Toggle variant="" size="sm" className={classNames(btnClassName, 'btn-reveal dropdown-caret-none transition-none')}>
        <FontAwesomeIcon icon={icon} className="fs-10"/>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className={classNames(dropdownMenuClassName, 'py-2')}>
        {children}
      </Dropdown.Menu>
    </Dropdown>);
};
export default RevealDropdown;
