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
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select, { components } from 'react-select';
const ClearIndicator = (props) => {
    const _a = props.innerProps, { ref } = _a, restInnerProps = __rest(_a, ["ref"]);
    return (<div {...restInnerProps} ref={ref} className="me-2">
      <div className="text-primary fs-9">clear</div>
    </div>);
};
const DropdownIndicator = (props) => {
    return (<components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faAngleDown} className="fs-9 text-body"/>
    </components.DropdownIndicator>);
};
const ReactSelect = (_a) => {
    var { icon } = _a, rest = __rest(_a, ["icon"]);
    return (<div className="react-select-container">
      <Select closeMenuOnSelect={false} components={{ ClearIndicator, DropdownIndicator }} classNamePrefix="react-select" classNames={{
            control: () => (icon ? 'ps-5' : ''),
            placeholder: () => (icon ? 'ps-2' : '')
        }} {...rest}/>
      {icon}
    </div>);
};
export default ReactSelect;
