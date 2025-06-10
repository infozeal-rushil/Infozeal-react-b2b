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
import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import HomepageFilterOffcanvasContent from './HomepageFilterOffcanvasContent';
const HomepageFilterOffcanvas = (_a) => {
    var { isOpen, setIsOpen } = _a, props = __rest(_a, ["isOpen", "setIsOpen"]);
    return (<Offcanvas show={isOpen} onHide={() => setIsOpen(false)} placement="end" {...props}>
      <Offcanvas.Header className="p-4 bg-body-highlight" closeButton>
        <h5 className="mb-0 text-body-highlight">Filter</h5>
      </Offcanvas.Header>
      <Offcanvas.Body className="scrollbar p-4">
        <HomepageFilterOffcanvasContent />
      </Offcanvas.Body>
    </Offcanvas>);
};
export default HomepageFilterOffcanvas;
