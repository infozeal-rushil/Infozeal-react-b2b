import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/32.png';
import SignUpForm from '@globals/g-components/modules/auth/SignUpForm';
const SignUp = () => {
  return (
    <AuthSplitLayout bg={bg}>
      <SignUpForm layout="split" />
    </AuthSplitLayout>
  );
};
export default SignUp;
