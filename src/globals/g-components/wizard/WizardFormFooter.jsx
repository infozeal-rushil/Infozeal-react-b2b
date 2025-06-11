import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from '@globals/g-components/base/Button';
import { useWizardFormContext } from '@globals/g-providers/WizardFormProvider';
const WizardFormFooter = ({
  className,
  nextBtnLabel = 'Next',
  hidePrevBtn,
  handleSubmit
}) => {
  const { selectedStep, goToStep, getCanNextPage, getCanPreviousPage } =
    useWizardFormContext();
  return (
    <div
      className={classNames(className, 'd-flex justify-content-between mb-0')}
    >
      <Button
        variant="link"
        className={classNames('p-0', {
          'd-none': hidePrevBtn || !getCanPreviousPage
        })}
        startIcon={<FontAwesomeIcon icon={faChevronLeft} className="fs-10" />}
        onClick={() => goToStep(selectedStep - 1)}
      >
        Previous
      </Button>
      {getCanNextPage && (
        <Button
          variant="primary"
          className={classNames('px-6', {
            'ms-auto': !hidePrevBtn
          })}
          endIcon={<FontAwesomeIcon icon={faChevronRight} className="fs-10" />}
          onClick={() => goToStep(selectedStep + 1)}
        >
          {nextBtnLabel}
        </Button>
      )}
    </div>
  );
};
export default WizardFormFooter;
