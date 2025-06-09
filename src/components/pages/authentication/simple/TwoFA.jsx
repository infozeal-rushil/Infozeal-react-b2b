import TwoFAForm from '@globals/g-components/modules/auth/TwoFAForm';
import AuthSimpleLayout from '@globals/g-layouts/AuthSimpleLayout';
const TwoFA = () => {
    return (<AuthSimpleLayout className="col-xxl-4">
      <TwoFAForm />
    </AuthSimpleLayout>);
};
export default TwoFA;
