import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from 'components/base/Button';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const TooltipIconButton = ({ title, icon, iconClass }) => {
    return (<OverlayTrigger overlay={<Tooltip style={{ position: 'fixed' }}>{title}</Tooltip>}>
      <div>
        <Button className="p-0 text-body-quaternary text-body-tertiary-hover">
          <FontAwesomeIcon icon={icon} className={classNames(iconClass)}/>
        </Button>
      </div>
    </OverlayTrigger>);
};
export default TooltipIconButton;
