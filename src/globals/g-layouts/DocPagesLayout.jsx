/* eslint-disable @typescript-eslint/ban-ts-comment */

import { snakeCase } from 'helpers/utils';
import React, { useEffect, useState } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
const DocPagesLayout = ({ children, sideNavItems }) => {
  const [navItems, setNavItems] = useState([]);
  useEffect(() => {
    if (sideNavItems) {
      setNavItems(sideNavItems);
    } else {
      const items = [];
      const recursiveMap = children => {
        React.Children.forEach(children, child => {
          var _a, _b, _c;
          if (React.isValidElement(child)) {
            if (
              ((_a =
                child === null || child === void 0 ? void 0 : child.props) ===
                null || _a === void 0
                ? void 0
                : _a.children) &&
              typeof child.type !== 'string' &&
              //@ts-ignore
              ((_b = child.type) === null || _b === void 0
                ? void 0
                : _b.componentName) !== 'PhoenixDocCardHeader'
            ) {
              recursiveMap(child.props.children);
            } else {
              if (
                typeof child.type !== 'string' &&
                //@ts-ignore
                ((_c = child.type) === null || _c === void 0
                  ? void 0
                  : _c.componentName) === 'PhoenixDocCardHeader' &&
                child.props.title
              ) {
                items.push({
                  to: snakeCase(child.props.title),
                  label: child.props.title
                });
              }
            }
          }
        });
      };
      recursiveMap(children);
      setNavItems(items);
    }
  }, []);
  return (
    <Row className="gx-3 gy-4 mb-7">
      <Col xs={12} xl={10} className="order-1 order-xl-0">
        {children}
      </Col>
      <Col xs={12} xl={2}>
        <div className="position-sticky" style={{ top: 80 }}>
          <h5>On this page</h5>
          <hr />
          <Nav as="ul" className="flex-column nav-vertical doc-nav">
            {navItems.map(item => (
              <NavItem item={item} key={item.label} />
            ))}
          </Nav>
        </div>
      </Col>
    </Row>
  );
};
const NavItem = ({ item }) => {
  const { hash } = useLocation();
  return (
    <Nav.Item as="li" key={item.to}>
      <Nav.Link active={hash === `#${item.to}`} href={`#${item.to}`}>
        {item.label}
      </Nav.Link>
      {item.subItem && (
        <Nav as="ul" className="flex-column">
          {item.subItem.map(subItem => (
            <NavItem item={subItem} key={subItem.to} />
          ))}
        </Nav>
      )}
    </Nav.Item>
  );
};
export default DocPagesLayout;
