import TwoFAForm from '@globals/g-components/modules/auth/TwoFAForm';
import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/40.png';
const TwoFA = () => {
  return (
    <AuthSplitLayout bg={bg}>
      <TwoFAForm layout="split" />
    </AuthSplitLayout>
  );
};
export default TwoFA;
