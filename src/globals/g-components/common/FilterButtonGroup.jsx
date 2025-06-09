import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import React from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
const FilterButtonGroup = ({ menus }) => {
    return (<ButtonGroup className="position-static">
      {menus.map(menu => (<Dropdown key={menu.label} as={ButtonGroup} className="position-static">
          <Dropdown.Toggle variant="phoenix-secondary" className="px-7 flex-shrink-0 dropdown-caret-none">
            {menu.label}
            <FontAwesomeIcon icon={faAngleDown} className="ms-2" transform="down-2"/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {menu.items.map((item, subIndex) => (<Dropdown.Item key={subIndex} onClick={item.onClick}>
                {item.label}
              </Dropdown.Item>))}
          </Dropdown.Menu>
        </Dropdown>))}
      <Button variant="phoenix-secondary" className="px-7 flex-shrink-0">
        More filters
      </Button>
    </ButtonGroup>);
};
export default FilterButtonGroup;
