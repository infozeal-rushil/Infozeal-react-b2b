import classNames from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';
const CheckButton = ({ inputProps, label, id, type = 'radio', className, variant = 'phoenix-secondary' }) => {
    return (<>
      <input className="btn-check" type={type} id={id} {...inputProps}/>
      <Button as="label" variant={variant} className={classNames(className, 'bg-body-hover fs-10 py-1 mb-0')} htmlFor={id}>
        {label}
      </Button>
    </>);
};
export default CheckButton;
