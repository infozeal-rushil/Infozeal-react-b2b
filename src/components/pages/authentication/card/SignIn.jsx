import SignInForm from '@globals/g-components/modules/auth/SignInForm';
import AuthCardLayout from '@globals/g-layouts/AuthCardLayout';
const SignIn = () => {
    return (<AuthCardLayout className="pb-md-7">
      <SignInForm layout="card"/>
    </AuthCardLayout>);
};
export default SignIn;
