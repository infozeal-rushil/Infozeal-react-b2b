import ForgotPasswordForm from '@globals/g-components/modules/auth/ForgotPasswordForm';
import AuthSimpleLayout from '@globals/g-layouts/AuthSimpleLayout';
const ForgotPassword = () => {
    return (<AuthSimpleLayout className="col-xxl-4">
      <ForgotPasswordForm />
    </AuthSimpleLayout>);
};
export default ForgotPassword;
