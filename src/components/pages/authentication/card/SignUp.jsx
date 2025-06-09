import SignUpForm from '@globals/g-components/modules/auth/SignUpForm';
import AuthCardLayout from '@globals/g-layouts/AuthCardLayout';
const SignUp = () => {
    return (<AuthCardLayout className="card-sign-up">
      <SignUpForm layout="card"/>
    </AuthCardLayout>);
};
export default SignUp;
