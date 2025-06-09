import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import React from 'react';
const ActionButton = ({ icon, children }) => (<div>
    <Button className="p-0 fw-semibold d-block">
      <FontAwesomeIcon icon={icon} className="me-3"/>
      {children}
    </Button>
  </div>);
export default ActionButton;
