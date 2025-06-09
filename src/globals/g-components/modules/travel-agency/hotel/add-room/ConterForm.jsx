import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import { useWizardFormContext } from 'providers/WizardFormProvider';
import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
const ConterForm = ({ name }) => {
    const methods = useWizardFormContext();
    const { formData, setFormData } = methods;
    const [value, setValue] = useState(2);
    const handleCount = (type) => {
        type === 'increase' && setValue(value + 1);
        type === 'decrease' && value >= 1 && setValue(value - 1);
    };
    useEffect(() => {
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    }, [value]);
    return (<InputGroup>
      <Button className="border px-3 bg-body-emphasis bg-body-hover lh-1" onClick={() => handleCount('decrease')}>
        <FontAwesomeIcon icon={faMinus}/>
      </Button>

      <FormControl type="number" name={name} defaultValue={value} className="input-spin-none text-center"/>
      <Button className="border px-3 bg-body-emphasis bg-body-hover lh-1" onClick={() => handleCount('increase')}>
        <FontAwesomeIcon icon={faPlus}/>
      </Button>
    </InputGroup>);
};
export default ConterForm;
