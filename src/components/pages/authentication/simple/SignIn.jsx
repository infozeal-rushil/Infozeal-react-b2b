import SignInForm from '@globals/g-components/modules/auth/SignInForm';
import AuthSimpleLayout from '@globals/g-layouts/AuthSimpleLayout';
const SignIn = () => {
    return (<AuthSimpleLayout>
      <SignInForm layout="simple"/>
    </AuthSimpleLayout>);
};
export default SignIn;
