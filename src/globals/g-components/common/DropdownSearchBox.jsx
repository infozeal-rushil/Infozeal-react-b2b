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
import React, { Children, cloneElement, useState } from 'react';
import SearchBox from './SearchBox';
import { Dropdown } from 'react-bootstrap';
const DropdownSearchBox = (_a) => {
    var { children, className, searchBoxClassName } = _a, rest = __rest(_a, ["children", "className", "searchBoxClassName"]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');
    return (<Dropdown className={className} onToggle={() => setOpenDropdown(!openDropdown)} show={openDropdown}>
      <Dropdown.Toggle as="div" aria-expanded={openDropdown} bsPrefix="toggle">
        <SearchBox placeholder="Search..." className={searchBoxClassName} value={searchInputValue} onChange={({ target }) => {
            setSearchInputValue(target.value);
            setOpenDropdown(true);
        }} {...rest}/>
      </Dropdown.Toggle>
      {children && (<Dropdown.Menu className="dropdown-menu border font-base start-0 py-0 overflow-hidden w-100" style={{ width: 400 }}>
          {Children.map(children, child => cloneElement(child, {
                searchValue: searchInputValue
            }))}
        </Dropdown.Menu>)}
    </Dropdown>);
};
export default DropdownSearchBox;
