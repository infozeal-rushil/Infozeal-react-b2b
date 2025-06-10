import { useWizardFormContext } from '@globals/g-providers/WizardFormProvider';
import React from 'react';
export const WizardForm = ({ children, step }) => {
  const { formRefs } = useWizardFormContext();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      ref={el => (formRefs.current[step - 1] = el)}
      noValidate
    >
      {children}
    </form>
  );
};
export default WizardForm;
