/* eslint-disable @typescript-eslint/no-non-null-assertion */
import classNames from 'classnames';
import Button from 'components/base/Button';
import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const totalInputLength = 6;
const TwoFAForm = ({ layout }) => {
    const [otp, setOtp] = useState('');
    const inputRefs = useRef([]);
    const handleChange = (e, index) => {
        var _a;
        const { value } = e.target;
        if (value) {
            [...value].slice(0, totalInputLength).forEach((char, charIndex) => {
                var _a;
                if (inputRefs.current && inputRefs.current[index + charIndex]) {
                    inputRefs.current[index + charIndex].value = char;
                    (_a = inputRefs.current[index + charIndex + 1]) === null || _a === void 0 ? void 0 : _a.focus();
                }
            });
        }
        else {
            inputRefs.current[index].value = '';
            (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
        const updatedOtp = inputRefs.current.reduce((acc, input) => acc + ((input === null || input === void 0 ? void 0 : input.value) || ''), '');
        setOtp(updatedOtp);
    };
    return (<div>
      <div className={classNames({ 'px-xxl-5': !(layout === 'split') })}>
        <div className={classNames('text-center', {
            'mb-6': !(layout === 'split')
        })}>
          <h4 className="text-body-highlight">Enter the verification code</h4>
          <p className="text-body-tertiary mb-0">
            An email containing a 6-digit verification code has been sent to the
            email address - exa*********.com
          </p>
          <p className="fs-10 mb-5">
            Don’t have access?
            <Link to="#!"> Use another method</Link>
          </p>
          <div className="verification-form">
            <div className="d-flex align-items-center gap-2 mb-3">
              {Array(totalInputLength)
            .fill('')
            .map((_, index) => (<React.Fragment key={index}>
                    <Form.Control ref={(el) => {
                inputRefs.current[index] = el;
            }} className="px-2 text-center" type="number" onChange={(e) => handleChange(e, index)}/>
                    {index === 2 && <span>-</span>}
                  </React.Fragment>))}
            </div>
            <Form.Check type="checkbox" className="text-start mb-4">
              <Form.Check.Input type="checkbox" name="2fa-checkbox" id="2fa-checkbox"/>
              <Form.Check.Label className="fs-8 fw-medium" htmlFor="2fa-checkbox">
                Don’t ask again on this device
              </Form.Check.Label>
            </Form.Check>
            <Button variant="primary" className="w-100 mb-5" type="submit" disabled={otp.length < totalInputLength}>
              Verify
            </Button>
            <Link to="#!" className="fs-9">
              Didn’t receive the code?
            </Link>
          </div>
        </div>
      </div>
    </div>);
};
export default TwoFAForm;
