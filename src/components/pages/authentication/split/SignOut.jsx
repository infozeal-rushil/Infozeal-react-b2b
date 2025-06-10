import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/31.png';
import SignOutForm from '@globals/g-components/modules/auth/SignOutForm';
const SignOut = () => {
  return (
    <AuthSplitLayout bg={bg} logo={false}>
      <SignOutForm layout="split" />
    </AuthSplitLayout>
  );
};
export default SignOut;
