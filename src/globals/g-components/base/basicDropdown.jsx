import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
const BasicDropdown = ({ children, className, btnClassName, dropdownMenuClassName, icon = faEllipsis }) => {
    return (<Dropdown className={classNames(className)} align="end">
      <Dropdown.Toggle variant="phoenix-secondary" size="sm" className={classNames(btnClassName, 'bg-body-emphasis bg-body-hover dropdown-caret-none')}>
        <FontAwesomeIcon icon={icon} className="fs-10"/>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className={classNames(dropdownMenuClassName, '')}>
        {children}
      </Dropdown.Menu>
    </Dropdown>);
};
export default BasicDropdown;
