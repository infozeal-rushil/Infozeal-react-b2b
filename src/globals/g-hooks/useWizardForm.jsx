import { useRef, useState } from 'react';
import usePhoenixForm from './usePhoenixForm';
const submitEvent = new Event('submit', {
  bubbles: true,
  cancelable: true
});
const useWizardForm = ({ validation, totalStep }, defaultValues) => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [openDeniedModal, setOpenDeniedModal] = useState(false);
  const formRefs = useRef([]);
  const methods = usePhoenixForm(defaultValues);
  const goToStep = targetStep => {
    // if (selectedStep === totalStep && targetStep < selectedStep) {
    //   setOpenDeniedModal(true);
    //   return;
    // }
    if (targetStep <= totalStep && targetStep > 0) {
      if (selectedStep > targetStep) {
        setSelectedStep(Number(targetStep));
      } else {
        const form = formRefs.current[selectedStep - 1];
        if (form) {
          form.dispatchEvent(submitEvent);
          if (form.checkValidity() || !validation) {
            setSelectedStep(Number(targetStep));
          } else {
            form.classList.add('was-validated');
          }
        }
      }
    }
  };
  const startOver = () => {
    setSelectedStep(1);
    methods.setFormData({});
  };
  const handleChange = e => {
    const { name, value } = e.target;
    methods.setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const getCanNextPage = selectedStep < totalStep;
  const getCanPreviousPage = selectedStep > 1;
  return Object.assign(
    Object.assign({ selectedStep, setSelectedStep }, methods),
    {
      handleChange,
      formRefs,
      startOver,
      goToStep,
      validation: !!validation,
      totalStep,
      getCanNextPage,
      getCanPreviousPage,
      openDeniedModal,
      setOpenDeniedModal
    }
  );
};
export default useWizardForm;
