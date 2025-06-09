import classNames from 'classnames';
import { Nav } from 'react-bootstrap';
const IsotopeNav = ({ navItems, className, defaultActiveKey, onSelect }) => {
    return (<Nav className={classNames(className)} defaultActiveKey={defaultActiveKey || navItems[0].eventKey} onSelect={onSelect}>
      {navItems.map((navItem) => (<Nav.Item key={navItem.eventKey}>
          <Nav.Link className="isotope-nav" eventKey={navItem.eventKey}>
            {navItem.label}
          </Nav.Link>
        </Nav.Item>))}
    </Nav>);
};
export default IsotopeNav;
