import ForgotPasswordForm from '@globals/g-components/modules/auth/ForgotPasswordForm';
import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/34.png';
const ForgotPassword = () => {
  return (
    <AuthSplitLayout bg={bg}>
      <ForgotPasswordForm layout="split" />
    </AuthSplitLayout>
  );
};
export default ForgotPassword;
