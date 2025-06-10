import { useState } from 'react';
const usePhoenixForm = (defaultValues) => {
    const [formData, setFormData] = useState(Object.assign({}, (defaultValues || {})));
    const onChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: ['checkbox', 'radio'].includes(e.target.type)
                ? e.target.checked
                : e.target.value }));
    };
    const setValue = (values) => {
        setFormData(Object.assign(Object.assign({}, formData), values));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log({ formData });
    };
    return { formData, setFormData, setValue, onChange, onSubmit };
};
export default usePhoenixForm;
