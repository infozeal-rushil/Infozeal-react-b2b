import React from 'react';
import { Form } from 'react-bootstrap';
const CheckboxItem = ({ type = 'checkbox', name, label, value }) => {
    return (<Form.Check type={type} id={String(value)} className="mb-0 d-flex align-items-center gap-2">
      <Form.Check.Input type={type} value={value} name={name} className="mt-0"/>
      <Form.Check.Label className="d-block lh-sm fs-8 text-body fw-normal mb-0">
        {label}
      </Form.Check.Label>
    </Form.Check>);
};
export default CheckboxItem;
