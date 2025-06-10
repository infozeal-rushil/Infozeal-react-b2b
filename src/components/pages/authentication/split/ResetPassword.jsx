import ResetPasswordForm from '@globals/g-components/modules/auth/ResetPasswordForm';
import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/35.png';
const ResetPassword = () => {
  return (
    <AuthSplitLayout bg={bg}>
      <ResetPasswordForm />
    </AuthSplitLayout>
  );
};
export default ResetPassword;
