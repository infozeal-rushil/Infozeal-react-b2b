import SignUpForm from '@globals/g-components/modules/auth/SignUpForm';
import AuthSimpleLayout from '@globals/g-layouts/AuthSimpleLayout';
const SignUp = () => {
    return (<AuthSimpleLayout>
      <SignUpForm layout="simple"/>
    </AuthSimpleLayout>);
};
export default SignUp;
